import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "authenticacion de usuarios",
  })
  @ApiBody({
    description: "cedenciales del usuario a autenticar",
    type: LoginUserDto,
  })
  @UseGuards(LocalGuard)
  @Post("login")
  login(@Req() req: any) {
    const { username, password, clientIp, os, browser } = req.body;
    return this.authService.validateUser({
      username,
      password,
      clientIp,
      os,
      browser,
    });
  }

  @ApiBearerAuth()
  @Post("logout")
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: any) {
    const { clientIp, os, browser } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    return this.authService.logout({
      token,
      clientIp,
      os,
      browser,
    });
  }

  @ApiBearerAuth()
  @Post("refresh-token")
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req: any) {
    const token = req.headers.authorization.split(" ")[1];
    return this.authService.refreshToken(token);
  }
}
