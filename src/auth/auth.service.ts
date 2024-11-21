import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../system/user/entities/user.entity";
import { Repository, UnorderedBulkOperation } from "typeorm";
import { LoginUserDto, logoutDto } from "./dto/login.dto";
import { HashService } from "../hash/hash.service";
import { AuthJwtService } from "./jwt/jwt.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { TokenBlacklistService } from "./jwt/blacklist/token.blacklist.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private hashService: HashService,
    private authJwtService: AuthJwtService,
    private readonly tokenBlacklistService: TokenBlacklistService
  ) {}

  async validateUser({
    username,
    password,
    clientIp,
    os,
    browser,
  }: LoginUserDto) {
    let user = undefined;
    try {
      user = await this.userRepository.query(`
        select distinct * from "system".vw_show_user_info vsui where vsui."user" = '${username}'
      `);
      user = user[0];
      if (!user) ExceptionsMessages.invalidCredentials();



      if (user.status_code != "STS-00000") {
        ExceptionsMessages.userStatusIssue();
      }

      const isPasswordValid = await this.hashService.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        ExceptionsMessages.invalidCredentials();
      }

      delete user.password;
      const payload = {
        userData: {
          code: user.code,
          username: user.user,
          role_code: user.role_code,
          status_code: user.status_code,
          rolname: user.rol,
          status: user.status,
          first_name: user.first_name,
          last_name: user.last_name,
          job_position: user.job_tittle,
          administrative_unit: user.administrative_unit_name,
        },
      };

      const accessToken = this.authJwtService.generateToken(payload);
      const userCode = payload.userData.code;
      const message = `HA INICIADO SESION EXITOSAMENTE DESDE ${clientIp}, ${os}, ${browser}`;

      const logsAccess = this.userRepository.query(`
          CALL "system".sp_create_bitacora_conexion('${userCode}','${message}')
        `);

      if (!logsAccess) {
        ExceptionsMessages.errorProcess();
      }

      console.log(
        `USUARIO ${userCode} HA INICIADO SESION EXITOSAMENTE DESDE ${clientIp}, ${os}, ${browser}`
      );


      return { accessToken: accessToken };
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async logout({ token, clientIp, os, browser }: logoutDto) {
    const decodeToken = await this.authJwtService.decoder(token);
    const userCode = decodeToken.userData.code;
    const message = `EL USUARIO ${userCode} HA FINALIZADO LA SESION DESDE ${clientIp}, ${os}, ${browser}`;
    const logsLogout = this.userRepository.query(`
      CALL "system".sp_create_bitacora_conexion('${userCode}','${message}')
    `);

    if (!logsLogout) {
      ExceptionsMessages.errorProcess();
    }
    this.tokenBlacklistService.addToBlacklist(token);
    console.log(
      `USUARIO ${userCode} HA FINALIZADO LA SESION DESDE ${clientIp}, ${os}, ${browser}`
    );
  }

  async refreshToken(oldToken: string) {
    let payload: any;

    try {
      payload = await this.authJwtService.verifyToken(oldToken);
      delete payload.exp;
    } catch (error) {
      throw new UnauthorizedException("Token invalido o Expirado");
    }
    const newToken = this.authJwtService.generateToken(payload);

    this.tokenBlacklistService.addToBlacklist(oldToken);
    return { accessToken: newToken };
  }
}
