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
import { SectorService } from "./sector.service";
import { CreateSectorDto, UpdateSectorDto } from "./dto/sector.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  sectorSchema,
  updateSectorSchema,
  validateSectorCodeParam,
} from "../../schema/sector.schema";
import { tableSchema, searchOptionsSchema } from "src/schema/extras.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@ApiTags("sector")
@Controller("sector")
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea un sector",
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea un sector exitosamente",
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
            "EL SECTOR (nombre_sector) HA SIDO CREADO CON EXITO CON EL CODIGO: (codigo_sector)",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el sector o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              code: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL CODIGO DEL SECTOR ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "EL MINIMO DE DIGITOS PARA EL CODIGO ES DE 2",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DE CARATERES PARA EL CODIGO ES DE 2",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN NUMEROS",
                    },
                  },
                },
              },
              name: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL SECTOR ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL SECTOR TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL SECTOR TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DEL SECTOR ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              sector_found: {
                type: "string",
                example: "EL SECTOR YA EXISTE",
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
  createSector(@Body() createSectorDto: CreateSectorDto) {
    try {
      sectorSchema.parse(createSectorDto);
      return this.sectorService.createSector(createSectorDto);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene los sectores por paginacion",
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
                example: "el codigo del sector",
              },
              name: {
                type: "string",
                example: "nombre del sector",
              },
              description: {
                type: "string",
                example: "descripcion del sector",
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
  getSectors(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      const parseLimit = parseInt(limit);
      tableSchema.parse({ searchOptions, limit, page: parsePage });
      return this.sectorService.getSectors(
        searchOptions,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene un sector",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    description:
      "Palabra clave para buscar el modulo, ya sea por codigo o nombre",
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
                example: "el codigo del sector",
              },
              name: {
                type: "string",
                example: "nombre del sector",
              },
              description: {
                type: "string",
                example: "descripcion del sector",
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
  @UseGuards(JwtAuthGuard)
  @Get("/get-sector")
  getSector(@Query("searchOptions") searchOptions: string) {
    try {
      searchOptionsSchema.parse({ searchOptions });
      return this.sectorService.getSector(searchOptions);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza un sector",
  })
  @ApiParam({
    name: "sector_code",
    required: true,
    description: "codigo del sector que actualizara sus datos",
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
          example: `EL SECTOR 'sector_name' SE HA ACTUALIZADO CON EXITO`,
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description:
      "mensaje de retorno cuando el sector que va actualizar no existe",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "EL SECTOR NO EXISTE",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el sector o un dato esta mal ingresado`,
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: {
            type: "object",
            properties: {
              code: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL CODIGO DEL SECTOR ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "EL MINIMO DE DIGITOS PARA EL CODIGO ES DE 2",
                    },
                    validation_3: {
                      type: "string",
                      example: "EL MAXIMO DE CARATERES PARA EL CODIGO ES DE 2",
                    },
                    validation_4: {
                      type: "string",
                      example: "SOLO SE PERMITEN NUMEROS",
                    },
                  },
                },
              },
              name: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL SECTOR ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL SECTOR TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL SECTOR TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DEL SECTOR ES REQUERIDO",
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
  @Put("/:sector_code")
  async updateSector(
    @Body() updateSector: UpdateSectorDto,
    @Param("sector_code") sector_code: string,
  ) {
    try {
      updateSectorSchema.parse(updateSector);
      validateSectorCodeParam.parse({ sector_code });
      return this.sectorService.updateSector(updateSector, sector_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
