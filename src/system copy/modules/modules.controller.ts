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
import { ModulesService } from "./modules.service";
import { CreateModuleDto, UpdateModuleDto } from "./dto/module.dto";
// import { UpdateModulePartialDto } from "./dto/updatePatch.dto";
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiQuery,
  ApiInternalServerErrorResponse,
} from "@nestjs/swagger";
import {
  moduleSchema,
  updateModuleSchema,
  validateModuleCodeParam,
} from "../../schema/module.schema";
import { tableSchema } from "../../schema/extras.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { Permissions } from "../access-level/enum/permission.enum";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { AuthJwtService } from "src/auth/jwt/jwt.service";

@ApiTags("Modules")
@Controller("module")
export class ModulesController {
  constructor(
    private readonly modulesService: ModulesService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  //metodo create
  @ApiBearerAuth()
  @ApiOperation({
    summary: `Crea un modulo`,
  })
  @ApiCreatedResponse({
    description: `mesaje de retorno cuando crea un modulo`,
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example:
            "MODULO 'name_module' SE HA CREADO CON EXITTO CON EL CODIGO: 'code'",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el modulo o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name_module: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL MODULO ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL MINIMO DEL NOMBRE DEL MODULO ES DE 6 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DEL NOMBRE DEL MODULO ES 50",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              pathern_code: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL PATHERN CODE ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "MINIMO DE CARACTERES DEL CODIGO PATERNO ES 9",
                    },
                    validation_3: {
                      type: "string",
                      example: "MAXIMO DE CARACTERES DEL CODIGO PADRE ES 9",
                    },
                    validation_4: {
                      type: "string",
                      example:
                        "SOLO SE PERMITE LETRAS, NUMEROS Y GUION COMO CARACTER ESPECIAL ( - )",
                    },
                  },
                },
              },
              src: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA RUTA DEL MODULO ES REQUERIDA",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "SOLO SE PERMITEN LETRAS Y SLASH BAR COMO CARACTER ESPECIAL ( / )",
                    },
                  },
                },
              },
              icon: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA RUTA DEL ICONO ES REQUERIDA",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "SOLO SE PERMITEN LETRAS, SLASH BAR Y PUNTO COMO CARACTERES ESPECIALES ( /. )",
                    },
                  },
                },
              },
              module_found: {
                type: "string",
                example: "EL NOMBRE name_module YA EXISTE!",
              },
            },
          },
        },
      },
    },
  })
  @ApiConflictResponse({
    description: `mensaje de retorno cuando el modulo supera el nivel de menu establecido`,
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "danger",
        },
        message: {
          type: "string",
          example: "EL NIVEL DEL MODULO NO PUEDE SER MAYOR A 3",
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
  create(@Request() req: any, @Body() createModuleDto: CreateModuleDto) {
    try {
      const authorizationHeader = req.headers["authorization"];
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = this.authJwtService.decoder(token);
      const role_code = decodedToken.userData.role_code;
      moduleSchema.parse(createModuleDto);
      return this.modulesService.createModule(
        createModuleDto,
        role_code,
        req.userCode,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo

  //metodo get por paginacion
  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene los modulos por paginacion",
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
                example: "el codigo del modulo",
              },
              pathern_code: {
                type: "string",
                example:
                  "codigo del modulo paterno en caso que el modulo sea un hijo o nieto",
              },
              name_module: {
                type: "string",
                example: "nombre del modulo",
              },
              src: {
                type: "string",
                example: "ruta del modulo",
              },
              icon: {
                type: "string",
                example: "ruta del icono del modulo",
              },
              active: {
                type: "boolean",
                example: true,
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
  @UseGuards(JwtAuthGuard)
  @Get()
  async getModules(
    @Query("searchOptions") searchOptions: string,
    @Query("onlyPathern") onlyPathern: boolean,
    @Query("limit") limit: string,
    @Query("page") page: string,
    @Request() req: any,
  ) {
    try {
      const parsePage = parseInt(page);

      tableSchema.parse({
        searchOptions,
        limit,
        page: parsePage,
      });
      return this.modulesService.getModules(
        searchOptions,
        onlyPathern,
        limit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo

  //metodo get de 1 dato
  @ApiBearerAuth()
  @ApiOperation({
    summary: "se obtiene 1 solo modulo buscado por el codigo del modulo",
  })
  @ApiOkResponse({
    description: "retorno del dato obtenido",
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
                example: "el codigo del modulo",
              },
              pathern_code: {
                type: "string",
                example:
                  "codigo del modulo paterno en caso que el modulo sea un hijo o nieto",
              },
              name_module: {
                type: "string",
                example: "nombre del modulo",
              },
              src: {
                type: "string",
                example: "ruta del modulo",
              },
              icon: {
                type: "string",
                example: "ruta del icono del modulo",
              },
              active: {
                type: "boolean",
                example: true,
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
  @UseGuards(JwtAuthGuard)
  @Get("/get-module")
  getModule(@Query("module_code") module_code: string) {
    try {
      validateModuleCodeParam.parse({
        module_code,
      });
      return this.modulesService.getModule(module_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo

  @UseGuards(JwtAuthGuard)
  @Get("/permissions/")
  getPermissionAvailable() {
    return Object.values(Permissions);
  }

  //metodo PUT para actualizar
  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza todos los datos del modulo",
  })
  @ApiParam({
    name: "module_code",
    required: true,
    description: "codigo del modulo que se actualizara",
  })
  @ApiOkResponse({
    description: `mensaje de retorno cuando la actualizacion sea exitosa`,
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "sucess",
        },
        message: {
          type: "string",
          example: `EL MODULO name_module SE HA ACTUALIZADO CON EXITO`,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name_module: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL MODULO ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL MINIMO DEL NOMBRE DEL MODULO ES DE 6 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DEL NOMBRE DEL MODULO ES 50",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              pathern_code: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL PATHERN CODE ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "MINIMO DE CARACTERES DEL CODIGO PATERNO ES 9",
                    },
                    validation_3: {
                      type: "string",
                      example: "MAXIMO DE CARACTERES DEL CODIGO PADRE ES 9",
                    },
                    validation_4: {
                      type: "string",
                      example:
                        "SOLO SE PERMITE LETRAS, NUMEROS Y GUION COMO CARACTER ESPECIAL ( - )",
                    },
                  },
                },
              },
              src: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA RUTA DEL MODULO ES REQUERIDA",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "SOLO SE PERMITEN LETRAS Y SLASH BAR COMO CARACTER ESPECIAL ( / )",
                    },
                  },
                },
              },
              icon: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "LA RUTA DEL ICONO ES REQUERIDA",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "SOLO SE PERMITEN LETRAS, SLASH BAR Y PUNTO COMO CARACTERES ESPECIALES ( /. )",
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
  @Put("/:module_code")
  async updateModuleWithPut(
    @Body() updateModuleDto: UpdateModuleDto,
    @Param("module_code") module_code: string,
    @Request() req: any,
  ) {
    try {
      updateModuleSchema.parse(updateModuleDto);
      validateModuleCodeParam.parse({ module_code });
      return this.modulesService.updateModules(
        updateModuleDto,
        module_code,
        req.userCode,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo

  //NOTE: SE COMENTA EL METODO PATCH PARA CUANDO SE TENGA TERMINADO TODO EL PROCESO
  //
  //metodo PATCH para actualizar
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: "actualiza los datos del modulo de manera parcial",
  // })
  // @ApiParam({
  //   name: "code",
  //   required: true,
  //   description: "codigo del modulo que se actualizara",
  // })
  // @ApiOkResponse({
  //   description: `mensaje de retorno cuando la actualizacion sea exitosa`,
  //   schema: {
  //     type: "object",
  //     properties: {
  //       type: {
  //         type: "string",
  //         example: "sucess",
  //       },
  //       message: {
  //         type: "string",
  //         example: `El modulo 'name_module' se ha actualizado con exito`,
  //       },
  //     },
  //   },
  // })
  // @ApiNotFoundResponse({
  //   description:
  //     "mensaje de retorno cuando el modulo que va actualizar no existe",
  //   schema: {
  //     type: "object",
  //     properties: {
  //       type: {
  //         type: "string",
  //         example: "info",
  //       },
  //       message: {
  //         type: "string",
  //         example: "El modulo no existe",
  //       },
  //     },
  //   },
  // })
  // @UseGuards(AuthGuard)
  // @Patch()
  // async updateModuleWithPatch(
  //   @Body() updateModuleDto: UpdateModulePartialDto,
  //   @Query("code") code: string
  // ) {
  //   return this.modulesService.updateModule(updateModuleDto, code);
  // }
}
