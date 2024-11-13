import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from "@nestjs/common";
import { AdministrativeUnitService } from "./administrative_unit.service";
import {
  CreateAdministrativeUnitDto,
  UpdateAdministrativeUnitDto,
} from "./dto/administrative_unit.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  administrativeUnitSchema,
  validateAdministrativeUnitCode,
} from "../../schema/administrativeUnit.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";

@ApiTags("Administrative Unit")
@Controller("administrative-unit")
export class AdministrativeUnitController {
  constructor(
    private readonly administrativeUnitService: AdministrativeUnitService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea una unidad administrativa",
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea una unidad administrativa",
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
            "LA UNIDAD nombre de la unidad HA SIDO CREADO CON EXITO CON EL CODIGO: codigo_unidad_administrativa",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe la unidad administrativa o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL MINIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 5",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL MAXIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 50",
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
                      example:
                        "LA DESCRIPCION DE LA UUNIDAD ADMINISTRATIVA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              program_found: {
                type: "string",
                example: "EL PROGRAMA A REGISTRAR YA EXISTE",
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
  @ApiBody({
    description: 'crea una unidad administrativa',
    type: CreateAdministrativeUnitDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createUnitAdministrative(
    @Body() createUnitAdministrativeDto: CreateAdministrativeUnitDto,
  ) {
    try {
      administrativeUnitSchema.parse(createUnitAdministrativeDto);
      return this.administrativeUnitService.createUnitAdministrative(
        createUnitAdministrativeDto
      );
    } catch (error) {
      const errors = JSON.parse(error.message).map((e) => {
        return {
          code: e.code,
          attr: e.path[0],
          message: e.message,
        };
      });
      return { type: "info", validations: errors };
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene las unidades administrativa por paginacion",
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
                example: "el codigo de la unidad administrativa",
              },
              sector_code: {
                type: "string",
                example: "el codigo del sector",
              },
              code_program: {
                type: "string",
                example: "el codigo del programa",
              },
              code_activity: {
                type: "string",
                example: "el codigo de la actividad",
              },
              name: {
                type: "string",
                example: "nombre de la unidad administrativa",
              },
              description: {
                type: "string",
                example: "descrpcion de la unidad administrativa",
              },
              sector_name: {
                type: "string",
                example: "nombre del sector",
              },
              program_name: {
                type: "string",
                example: "nombre del programa",
              },
              activity_name: {
                type: "string",
                example: "nomnbre de la actividad",
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
          type: "object",
          example: {},
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getUnitAdministratives(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: number,
    @Query("page") page: number,
  ) {
    return this.administrativeUnitService.getUnitAdministratives(
      searchOptions,
      limit,
      page,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene una unidad administrativa",
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
                example: "el codigo de la unidad administrativa",
              },
              sector_code: {
                type: "string",
                example: "el codigo del sector",
              },
              code_program: {
                type: "string",
                example: "el codigo del programa",
              },
              code_activity: {
                type: "string",
                example: "el codigo de la actividad",
              },
              name: {
                type: "string",
                example: "nombre de la unidad administrativa",
              },
              description: {
                type: "string",
                example: "descrpcion de la unidad administrativa",
              },
              sector_name: {
                type: "string",
                example: "nombre del sector",
              },
              program_name: {
                type: "string",
                example: "nombre del programa",
              },
              activity_name: {
                type: "string",
                example: "nomnbre de la actividad",
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
          type: "object",
          example: {},
        },
      },
    },
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    description:
      "Palabra clave para buscar el modulo, ya sea por codigo o nombre",
  })
  @UseGuards(JwtAuthGuard)
  @Get("get-administrative-unit")
  getUnitAdministrative(@Query("searchOptions") searchOptions: string) {
    return this.administrativeUnitService.getUnitAdministrative(searchOptions);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza una unidad administrativa",
  })
  @ApiParam({
    name: "administrative_unit_code",
    required: true,
    description: "codigo de la unidad administrativa",
  })
  @ApiBody({
    description: "Datos para crear una unidad administrativa",
    type: UpdateAdministrativeUnitDto,
  })
  @ApiOkResponse({
    description: "mensaje de retorno cuando se crea una unidad administrativa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "LA UNIDAD nombre_de_la_unidad SE HA ACTUALIZADO CON EXITO",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe la unidad administrativa o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL MINIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 5",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL MAXIMO DE CARACTERES PARA EL NOMBRE DE LA UNIDAD ADMINISTRATIVA ES 50",
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
                      example:
                        "LA DESCRIPCION DE LA UUNIDAD ADMINISTRATIVA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              program_found: {
                type: "string",
                example: "EL PROGRAMA A REGISTRAR YA EXISTE",
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
  @Put("/:administrative_unit_code")
  updateAdministrativeUnit(
    @Body() updateAdministrativeUnitDto: UpdateAdministrativeUnitDto,
    @Param("administrative_unit_code") administrative_unit_code: string,
  ) {
    try {
      administrativeUnitSchema.parse(updateAdministrativeUnitDto);
      validateAdministrativeUnitCode.parse({
        code_administrative_unit: administrative_unit_code,
      });
      return this.administrativeUnitService.updateAdministrativeUnit(
        updateAdministrativeUnitDto,
        administrative_unit_code,
      );
    } catch (error) {
      const errors = JSON.parse(error.message).map((e) => {
        return {
          code: e.code,
          attr: e.path[0],
          message: e.message,
        };
      });
      return { type: "info", validations: errors };
    }
  }
}
