import { Injectable } from "@nestjs/common";
import {
  ChangePasswordDto,
  ChangePasswordToUserDto,
  CreateUserDto,
  UpdateUserDto,
} from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { HashService } from "../../hash/hash.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService
  ) {}

  async createUser(user: CreateUserDto, userCode: string) {
    try {
      const obtainedUser = await this.obtainUser(user.username);
      const obatinedEmployee = await this.obtainEmployee(user.employeed_code);
      const obtainedRole = await this.obtainRole(user.role_code);
      const obtainedStatus = await this.obtainStatus(user.status_code);

      if (!!obtainedUser[0]) {
        ExceptionsMessages.alreadyExists(`EL USUARIO ${user.username}`);
      }

      if (!obatinedEmployee[0] || !obtainedRole[0] || !obtainedStatus[0]) {
        ExceptionsMessages.usersCodesNoExists();
      }

      user.password = await this.hashService.hashPassword(user.password);

      const newUser = await this.userRepository.query(
        `
      call "system".sp_create_user($1, $2, $3, $4, $5, $6, $7)
      `,
        [
          user.role_code,
          user.employeed_code,
          user.status_code,
          user.username,
          user.password,
          userCode,
          "",
        ]
      );

      if ([null, undefined, "", 0].includes(newUser[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.create(
        `EL USUARIO ${user.username}`,
        newUser[0]._code
      );
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getUsers(searchOptions: string, limit: number, page: number) {
    try {
      const getData = await this.getData(searchOptions, limit, page);

      const maxPage = await this.maxPage(searchOptions, limit);

      return {
        getData: getData,
        maxPage: Math.ceil(maxPage[0].max_page / limit) - 1,
        totalRows: Number(maxPage[0].max_page),
      };
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async getUser(searchOptions: string) {
    const getData = await this.userRepository.query(`
    select vsui.code, 
    vsui."user", 
    vsui.role_code, 
    vsui.rol,
    vsui.status_code, 
    vsui.status, 
    vsui.employee_code, 
    vsui.job_position_code,
    vsui.personal_data_code,
    vsui.first_name, 
    vsui.last_name, 
    vsui.identify_acronym, 
    vsui.identify_number, 
    vsui.birth_date, 
    vsui.gender, 
    vsui.phone_number, 
    vsui.home_address, 
    vsui.job_tittle,  
    vsui.administrative_unit_code,
    vsui.administrative_unit_name,
    vsui.sector_code,
    vsui.sector_name,
    vsui.program_code,
    vsui.program_name,
    vsui.activity_code,
    vsui.activity_name 
    from "system".vw_show_user_info vsui where vsui.code LIKE '%${searchOptions.toUpperCase()}%'
  `);
    return { getData: getData[0] };
  }

  async updatePassword(user_code: string, changePassword: ChangePasswordDto) {
    try {
      const { currentPassword } = changePassword;

      const getCurrentPassword = await this.userRepository.query(`
        select vsui."password" from "system".vw_show_user_info vsui where vsui.code = '${user_code}'
      `);

      const isSamePassword = await this.hashService.comparePassword(
        currentPassword,
        getCurrentPassword[0].password
      );

      if (!isSamePassword) {
        ExceptionsMessages.currentPasswordError();
      }

      const hashNewPassword = await this.hashService.hashPassword(
        changePassword.newPassword
      );
      const updateCurrentPassword = await this.userRepository.query(
        `
        CALL "system".sp_update_user_password('${user_code}', '${hashNewPassword}')
      `
      );

      if ([null, undefined, "", 0].includes(updateCurrentPassword[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.changePasswordSuccess();
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async updatePasswordToUser(
    user_code: string,
    changePassword: ChangePasswordToUserDto
  ) {
    try {
      const newUserPassword = changePassword.newPassword;

      const hashNewPassword =
        await this.hashService.hashPassword(newUserPassword);
      const newPassword = await this.userRepository.query(
        `
        CALL "system".sp_update_user_password('${user_code}', '${hashNewPassword}')
      `
      );
      console.log(newPassword[0]);

      if ([null, "", 0].includes(newPassword[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.changePasswordSuccess();
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  async updateUser(UpdateUserDto: UpdateUserDto, user_code: string) {
    try {
      const getUser = await this.userRepository.query(`
        select vsui.code from "system".vw_show_user_info vsui where vsui.code = '${user_code}'
      `);
      if (getUser.length === 0) {
        ExceptionsMessages.notFound(`EL USUARIO ${user_code}`);
      }

      const userUpdate = await this.userRepository.query(
        `
        call "system".sp_update_user($1,$2,$3,$4)
      `,
        [
          user_code,
          UpdateUserDto.role_code,
          UpdateUserDto.status_code,
          UpdateUserDto.enabled,
        ]
      );
      if ([null, "", 0].includes(userUpdate[0])) {
        ExceptionsMessages.errorProcess();
      }

      ExceptionsMessages.update(`EL USUARIO ${user_code}`);
    } catch (error) {
      ExceptionsMessages.createErrorSignature(error);
    }
  }

  // METODOS PRIVADOS

  private async getData(searchOptions: string, limit: number, page: number) {
    return await this.userRepository.query(`
    select vsui.code, 
    vsui."user", 
    vsui.status, 
    vsui.employee_code,
    vsui.first_name,
    vsui.last_name,
    vsui.identify_acronym, 
    vsui.identify_number 
    from "system".vw_show_user_info vsui where vsui.user LIKE '%${searchOptions}%' or vsui.code LIKE '%${searchOptions.toUpperCase()}%' limit ${limit} offset ${
      page * limit
    }`);
  }

  private async maxPage(searchOptions: string, validatedLimit: number) {
    return await this.userRepository.query(`
      select count(*) as max_page from "system".vw_show_user_info vsui where vsui.user LIKE '%${searchOptions.toUpperCase()}%' or vsui.code LIKE '%${searchOptions.toUpperCase()}%' limit ${validatedLimit} 
    `);
  }

  private async obtainEmployee(code: string) {
    return await this.userRepository.query(`
    select e.code from rrhh.employeed e where e.code = '${code}'
    `);
  }

  private async obtainRole(code: string) {
    return await this.userRepository.query(`
    select vsar.code from "system".vw_show_all_role vsar where vsar.code = '${code}'
    `);
  }

  private async obtainStatus(code: string) {
    return await this.userRepository.query(`
    select s.code from "system".status s where s.code = '${code}'
    `);
  }

  private async obtainUser(username: string) {
    return await this.userRepository.query(`
    select u.username from "system"."user" u where u.username = '${username}'
    `);
  }
}
