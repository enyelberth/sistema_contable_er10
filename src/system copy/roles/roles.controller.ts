import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Put,
  Param,
  Request,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiParam,
  ApiInternalServerErrorResponse,
} from "@nestjs/swagger";
import {
  roleSchema,
  validateEquals,
  validateRoleCodeParam,
} from "../../schema/role.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { AccessLevelService } from "../access-level/access-level.service";
import { tableSchema } from "src/schema/extras.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { AuthJwtService } from "src/auth/jwt/jwt.service";
import { Schema } from "zod";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly AccessLevelService: AccessLevelService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea un rol",
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea un rol existosamente",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "succes",
        },
        message: {
          type: "string",
          example: `Rol 'name_rol' creado con exito, bajo el codigo: 'codigo_rol'`,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el rol o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name_role: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL ROL ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "EL MINIMO DE CARACTERES PARA EL ROL SON 4",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DE CARATERES PARA EL ROL SON 50",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              description: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA DESCRIPCION DEL ROL ES REQUERDIA",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description:
      "mensaje de retorno cuando falla la conexion a la BD o fallo del sistema",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "danger",
        },
        message: {
          type: "string",
          example:
            "ERROR EN EL ENVIO DE DATOS O PROBLEMA AL CONECTAR LA BASE DE DATOS",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto, @Request() req: any) {
    try {
      roleSchema.parse(createRoleDto);
      return this.rolesService.createRole(createRoleDto, req.userCode);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene todos los roles por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description:
      "Palabra clave para buscar el modulo, ya sea por codigo o nombre",
  })
  @ApiQuery({
    name: "limit",
    required: true,
    description: "limite de dato a mostrar en el grid",
  })
  @ApiQuery({
    name: "page",
    required: true,
    description: "todas las paginas por limite de dato se inicia en el 0",
  })
  //@UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: "retorno de los datos obtenidos",
    schema: {
      type: "object",
      properties: {
        getData: {
          type: "array",
          items: {
            type: "object",
            properties: {
              code: {
                type: "string",
                example: "el codigo del role",
              },
              name_role: {
                type: "string",
                example: "nombre del role",
              },
              description: {
                type: "string",
                example: "descripcion del rol",
              },
            },
          },
        },
        maxPage: {
          type: "number",
          example: "1",
        },
        totalRows: {
          type: "number",
          example: "1",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "mensaje de retorno cuando la consulta no obtiene los datos",
    schema: {
      type: "object",
      properties: {
        getData: {
          type: "array",
          example: "[]",
        },
      },
    },
  })
  @Get()
  getRoles(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      const parseLimit = parseInt(limit);
      tableSchema.parse({
        searchOptions: searchOptions,
        limit: limit,
        page: parsePage,
      });
      return this.rolesService.getRoles(searchOptions, parseLimit, parsePage);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene 1 rol",
  })
  @ApiOkResponse({
    description: "retorno de los datos obtenidos",
    schema: {
      type: "object",
      properties: {
        getData: {
          type: "array",
          items: {
            type: "object",
            properties: {
              code: {
                type: "string",
                example: "el codigo del role",
              },
              name_role: {
                type: "string",
                example: "nombre del role",
              },
              description: {
                type: "string",
                example: "descripcion del rol",
              },
            },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "mensaje de retorno cuando la consulta no obtiene los datos",
    schema: {
      type: "object",
      properties: {
        getData: {
          type: "array",
          example: "[]",
        },
      },
    },
  })
  @Get("/get-role")
  getRole(@Query("role_code") role_code: string) {
    try {
      validateRoleCodeParam.parse({
        role_code,
      });
      return this.rolesService.getRole(role_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene todos los permisos de los modulos en rol",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/accessByRole/")
  getPermissionByRole(@Query("role_code") role_code: string) {
    try {
      validateRoleCodeParam.parse({
        role_code,
      });
      return this.AccessLevelService.findAccessLevelByRole(role_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza los datos del rol",
  })
  @ApiParam({
    name: "role_code",
    required: true,
    description: "codigo del rol que se actualizara",
  })
  @ApiOkResponse({
    description: "mensaje de retorno cuando la actualizacion sea exitosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "EL ROL name_role SE HA ACTUALIZADO CON EXITO!",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: "mensaje de retorno cuando el rol que va actualizar no existe",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "EL ROL NO EXISTE!",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el rol o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name_role: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL ROL ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "EL MINIMO DE CARACTERES PARA EL ROL SON 4",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DE CARATERES PARA EL ROL SON 50",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              description: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA DESCRIPCION DEL ROL ES REQUERDIA",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: "role_code",
    required: true,
    description: "codigo del rol para actualizar los permisos",
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza el estatus de los permisos",
  })
  @UseGuards(JwtAuthGuard)
  @Put("/update-permission/:role_code")
  async updatePermissionStatus(
    @Param("role_code") role_code: string,
    @Body("permissions") permissions: Array<{ status: boolean; code: number }>,
    @Request() req: any,
  ) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = this.authJwtService.decoder(token);
    const role_code_from_token = decodedToken.userData.role_code;

    try {
      validateEquals.parse({
        role_code,
        role_jwt: role_code_from_token,
      });
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
    return this.AccessLevelService.updateStatusPermission(
      permissions,
      role_code,
      //req.userCode
    );
  }

  //@UseGuards(JwtAuthGuard)
  @Put("/:role_code")
  async updateRoleWithPut(
    @Body() updateRoleDto: UpdateRoleDto,
    @Param("role_code") role_code: string,
  ) {
    try {
      roleSchema.parse(updateRoleDto);
      validateRoleCodeParam.parse({ role_code });
      return this.rolesService.updateRole(updateRoleDto, role_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
