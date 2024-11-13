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
import { ActivityService } from "./activity.service";
import { CreateActivityDto, UpdateActivityDto } from "./dto/activity.dto";
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
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
  activitySchema,
  updateAcitivitySchema,
  validateActivityCodeParam,
} from "../../schema/activity.schema";
import { tableSchema, searchOptionsSchema } from "src/schema/extras.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { validateProgramCodeParam } from "src/schema/program.schema";

@ApiTags("activity")
@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea una actividad",
  })
  @ApiBody({
    description: "crea una activiad",
    type: CreateActivityDto,
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea una actividad exitosamente",
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
            "LA ACTIVIDAD (nombre_actividad) HA SIDO CREADO CON EXITO CON EL CODIGO: (codigo_actividad)",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: `mensaje de retorno cuando ya existe la actividad o un dato esta mal ingresado`,
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
                      example: "EL CODIGO DE LA ACTIVIDAD REQUERIDO",
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
                      example: "EL NOMBRE DE LA ACTIVIDAD ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA ACTIVIDAD TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA ACTIVIDAD TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DE LA ACTIVIDAD ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example: "SOLO SE PERMITEN LETRAS",
                    },
                  },
                },
              },
              activity_found: {
                type: "string",
                example: "LA ACTIVIDAD A REGISTRAR YA EXISTE",
              },
            },
          },
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
          example:
            "PROBLEMA AL ENVIAR LOS DATOS O NO SE PUDO CONECTAR A LA BASE DE DATOS",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createActivity(@Body() createActivityDto: CreateActivityDto) {
    try {
      activitySchema.parse(createActivityDto);
      validateProgramCodeParam.parse({
        program_code: createActivityDto.program_code,
      });
      return this.activityService.createActivity(createActivityDto);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene las actividades por paginacion",
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
                example: "el codigo de la actividad",
              },
              name: {
                type: "string",
                example: "nombre de la actividad",
              },
              description: {
                type: "string",
                example: "descripcion de la actividad",
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
    description: "mensaje de retorno cuando la consulta no obtiene los dat1s",
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
  getActivities(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      const parseLimit = parseInt(limit);
      tableSchema.parse({ searchOptions, limit, page: parsePage });

      return this.activityService.getActivities(
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
    summary: "se obtiene una actividad",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    description: "palabra clave para buscar una actividad en especifico",
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
                example: "el codigo de la actividad",
              },
              name: {
                type: "string",
                example: "nombre de la actividad",
              },
              description: {
                type: "string",
                example: "descripcion de la actividad",
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
  @Get("/get-activity")
  getActivity(@Query("searchOptions") searchOptions: string) {
    try {
      searchOptionsSchema.parse({ searchOptions });
      return this.activityService.getActivity(searchOptions);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza una actividad",
  })
  @ApiParam({
    name: "activity_code",
    required: true,
    description: "codigo de la actividad que actualizara sus datos",
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
          example: `LA ACTIVIDAD 'actividad_name' SE HA ACTUALIZADO CON EXITO`,
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
                      example: "EL NOMBRE DE LA ACTIVIDAD ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA ACTIVIDAD TIENE COMO MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DE LA ACTIVIDAD TIENE COMO MAXIMO 50 CARACTERES",
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
                      example: "LA DESCRIPCION DE LA ACTIVIDAD ES REQUERIDO",
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
      "mensaje de retorno cuando la actividad que va actualizar no existe",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "LA ACTIVIDAD NO EXISTE",
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
  @Put("/:activity_code/:program_code")
  updateActivity(
    @Body() updateActivityDto: UpdateActivityDto,
    @Param("activity_code") activity_code: string,
    @Param("program_code") program_code: string,
  ) {
    try {
      updateAcitivitySchema.parse(updateActivityDto);
      validateActivityCodeParam.parse({ activity_code });
      validateProgramCodeParam.parse({ program_code });
      return this.activityService.updateActivity(
        updateActivityDto,
        activity_code,
        program_code,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "Obtiene las actividades relacionadas a un programa",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/get-activities/")
  getActivitiesByProgram(@Query("program_code") program_code: string) {
    try {
      validateProgramCodeParam.parse({ program_code });
      return this.activityService.getActivitiesByProgram(program_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "obtiene la informacion de la actividad relacionada al programa",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/activity-info/")
  getActivityByProgram(
    @Query("activity_code") activity_code: string,
    @Query("program_code") program_code: string,
  ) {
    try {
      validateActivityCodeParam.parse({ activity_code });
      validateProgramCodeParam.parse({ program_code });
      return this.activityService.activityInfoByProgram(
        activity_code,
        program_code,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
