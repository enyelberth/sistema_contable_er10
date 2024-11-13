import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "nombre de usuario",
    example: "jhondoe",
  })
  username: string;
  @ApiProperty({
    description: "password del usuario",
    example: "******",
  })
  password: string;

  clientIp: string;

  os: string;

  browser: string;
}

export class logoutDto {
  token: string;

  clientIp: string;

  os: string;

  browser: string;
}
