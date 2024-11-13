import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthJwtService {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  decoder(token: string) {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      return null;
    }
  }
}
