import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
  Put,
} from "@nestjs/common";
import { ProgramService } from "./program.service";
import { CreateProgramDto, UpdateProgramDto } from "./dto/program.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
  programSchema,
  updateProgramSchema,
  validateProgramCodeParam,
} from "../../schema/program.schema";
import { validateSectorCodeParam } from "src/schema/sector.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { searchOptionsSchema, tableSchema } from "src/schema/extras.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@ApiTags("program")
@Controller("program")
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea un programa",
  })
  @ApiBody({
    description: "crea un programa",
    type: CreateProgramDto,
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea un programa exitosamente",
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
            "EL PROGRAMA (nombre_programa) HA SIDO CREADO CON EXITO CON EL CODIGO: (codigo_programa)",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el programa o un dato esta mal ingresado`,
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
                      example: "EL CODIGO DEL PROGRAMA ES REQUERIDO",
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
                      example: "EL NOMBRE DEL PROGRAMA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL PROGRAMA TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL PROGRAMA TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DEL PROGRAMA ES REQUERIDO",
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
  @Post()
  createProgram(@Body() createProgramDto: CreateProgramDto) {
    try {
      programSchema.parse(createProgramDto);
      return this.programService.createProgram(createProgramDto);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene todos los programa por paginacion",
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
                example: "el codigo del programa",
              },
              name: {
                type: "string",
                example: "nombre del programa",
              },
              description: {
                type: "string",
                example: "descripcion del programa",
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
  getPrograms(
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
      return this.programService.getPrograms(
        searchOptions,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "se obtiene un programa en especifico",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    description:
      "Palabra clave para buscar el modulo, ya sea por codigo o nombre",
  })
  @ApiBearerAuth()
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
                example: "el codigo del programa",
              },
              name: {
                type: "string",
                example: "nombre del programa",
              },
              description: {
                type: "string",
                example: "descripcion del programa",
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
  @Get("/get-program")
  getProgram(@Query("searchOptions") searchOptions: string) {
    try {
      searchOptionsSchema.parse({ searchOptions });
      return this.programService.getProgram(searchOptions);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "acutaliza un programa",
  })
  @ApiParam({
    name: "program_code",
    required: true,
    description: "codigo del programa que actualizara sus datos",
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
          example: `EL PROGRAMA 'programa_name' SE HA ACTUALIZADO CON EXITO`,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe el programa o un dato esta mal ingresado`,
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
                      example: "EL NOMBRE DEL PROGRAMA ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL PROGRAMA TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL PROGRAMA TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DEL PROGRAMA ES REQUERIDO",
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
  @ApiNotFoundResponse({
    description:
      "mensaje de retorno cuando el programa que va actualizar no existe",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "EL PROGRAMA NO EXISTE",
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description:
      "mensaje de retorno cuando los datos no se envian correctamente o no se conecto a la base de datos",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "danger",
        },
        message: {
          type: "string",
          example: "ERROR AL CONECTARSE CON LA BASE DE DATOS",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Put("/:program_code")
  updateProgram(
    @Body() updateProgram: UpdateProgramDto,
    @Param("program_code") program_code: string,
  ) {
    try {
      updateProgramSchema.parse(updateProgram);
      validateProgramCodeParam.parse({ program_code });
      return this.programService.updateProgram(updateProgram, program_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "Obtiene los programas relacionados a un sector",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/get-programs/")
  getProgramsBySector(@Query("sector_code") sector_code: string) {
    try {
      validateSectorCodeParam.parse({ sector_code: sector_code });
      return this.programService.getProgramBySector(sector_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "obtiene la informacion del programa asociado al sector",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/program-info/")
  getProgramInfoBySector(@Query("program_code") program_code: string) {
    try {
      validateProgramCodeParam.parse({ code_program: program_code });
      return this.programService.getProgramInfoBySector(program_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
