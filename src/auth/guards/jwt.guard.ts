import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthJwtService } from "../jwt/jwt.service";
import { TokenBlacklistService } from "../jwt/blacklist/token.blacklist.service";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authJwtService: AuthJwtService,
    private tokenBlacklistService: TokenBlacklistService,
    private cacheService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let os = request.headers["user-agent"];
    const osRegex = /(Windows|Linux|Mac OS)/g;
    const browserRegex =
      /(Chrome|Firefox|Safari|Opera|Microsoft Edge|Brave|Chromium|Vivaldi)/g;
    let browser = os.toString().match(browserRegex)[0];
    os = os.toString().match(osRegex)[0];

    let clientIp =
      request.headers["x-forwarder-for"] || request.socket.remoteAddress;
    const ipRegex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    clientIp = clientIp.toString().match(ipRegex)[0];
    request.body.clientIp = clientIp;
    request.body.os = os;
    request.body.browser = browser;
    const token = request.headers.authorization
      ? request.headers.authorization.split(" ")[1]
      : "";

    if (["", undefined, null, 0].includes(token)) {
      throw new UnauthorizedException();
    }

    if (!token) {
      throw new UnauthorizedException(
        "La sesion ya expiro, Ingrese nuevamente",
      );
      //return false;
    } else if (!token || this.tokenBlacklistService.isTokenBlacklisted(token)) {
      return false;
    } else {
      const user = this.authJwtService.verifyToken(token);
      if (user) {
        request.userCode = user.userData.code; 
        return true;
      } else {
        const userData = await this.authJwtService.decoder(token);
        await this.cacheService.delete(userData.userData.code);
      }
      //return user ? true : false;
    }
  }

  async getUserCodeFromToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization.split(" ")[1]
      : "";
    const decodeToken = this.authJwtService.decoder(token);
    const user_code = decodeToken.user_code;
    return user_code;
  }
}
