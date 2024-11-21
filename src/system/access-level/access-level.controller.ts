import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { AccessLevelService } from "./access-level.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { AuthJwtService } from "src/auth/jwt/jwt.service";

@ApiTags("AccessLevel")
@Controller("access-level")
export class AccessLevelController {
  constructor(
    private readonly accessLevelService: AccessLevelService,    private readonly authJwtService: AuthJwtService,
  ) {}

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Obtiene los permisos por rol y los modulos con el acceso",
  })
  @ApiQuery({
    name: "module_code",
    required: true,
    description:
      "codigo del modulo a los que hara busqueda de todos los permisos que tenga con el rol",
  })
  @ApiQuery({
    name: "role_code",
    required: true,
    description:
      "codigo del rol al que buscara los permisos que tiene con los modulos",
  })
  @ApiOkResponse({
    description: "Mensaje de retorno cuando la consulta sea existosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "sucess",
        },
        message: {
          type: "string",
          example: "Datos obtenidos con exito",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "mensaje de retorno cuando la consulta no obtiene los datos",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "No hay datos para mostrar",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get("/accessByModule/")
  permissionByMenu(
    @Query("module_code") module_code: string,
    @Query("role_code")
    role_code: string,
  ) {
    return this.accessLevelService.accessByModule(module_code, role_code);
  }

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtener el menu de acceso para dibujar el navbar",
  })
  @ApiOkResponse({
    description: "Mensaje de retorno cuando la consulta sea existosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "sucess",
        },
        message: {
          type: "string",
          example: "Datos obtenidos con exito",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "mensaje de retorno cuando la consulta no obtiene los datos",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "No hay datos para mostrar",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get("/menu/")
  async findAccessLevelByUser(@Request() req) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = this.authJwtService.decoder(token);
    const role_code = decodedToken.userData.role_code;



  }
}
