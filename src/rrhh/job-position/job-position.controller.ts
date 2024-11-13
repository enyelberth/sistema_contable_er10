import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Put,
  Param,
} from "@nestjs/common";
import { JobPositionService } from "./job-position.service";
import {
  CreateJobPositionDto,
  UpdateJobPositionDto,
} from "./dto/job-position.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  jobPositionSchema,
  validateJobPositionCodeParam,
} from "../../schema/jobPosition.schema";
import { tableSchema, searchOptionsSchema } from "src/schema/extras.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@ApiTags("Job Position")
@Controller("job-position")
export class JobPositionController {
  constructor(private readonly jobPositionService: JobPositionService) {}

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "crea un cargo o puesto de trabajo",
  })
  @ApiCreatedResponse({
    description:
      "mensaje de retorno cuando se crea un cargo o puesto de trabajo",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "Cargo o Puesto de trabajo creado con exito!",
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
              name: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    validation_1: {
                      type: "string",
                      example: "EL NOMBRE DEL CARGO ES REQUERIDO",
                    },
                    validation_2: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL CARGO DEBE TENER MINIMO 5 CARACTERES",
                    },
                    validation_3: {
                      type: "string",
                      example:
                        "EL NOMBRE DEL CARGO DEBE TENER MAXIMO DE 50 CARACTERES",
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
              jobPosition_found: {
                type: "string",
                example: "EL CARGO YA ESTA REGISTRADO",
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
  createJobPosition(@Body() job: CreateJobPositionDto) {
    try {
      jobPositionSchema.parse(job);
      return this.jobPositionService.createJob(job);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "se obtiene los cargo registrado por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description:
      "Palabra clave para buscar el puesto de trabajo, ya sea por codigo o nombre",
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
                example: "codigo del cargo",
              },
              job_name: {
                type: "string",
                example: "un cargo",
              },
              description: {
                type: "string",
                example: "la descripcion de la misma",
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
  @Get()
  getJobPositions(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      const parseLimit = parseInt(limit);
      tableSchema.parse({ searchOptions, limit, page: parsePage });
      return this.jobPositionService.getJobPositions(
        searchOptions,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "se obtiene un puesto de trabajo especifico",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    description:
      "Palabra clave para buscar el puesto de trabajo, ya sea por codigo o nombre",
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
                example: "codigo del cargo",
              },
              job_name: {
                type: "string",
                example: "un cargo",
              },
              description: {
                type: "string",
                example: "la descripcion de la misma",
              },
            },
          },
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
  @Get("/get-job-position")
  getJobPosition(@Query("searchOptions") searchOptions: string) {
    try {
      searchOptionsSchema.parse({ searchOptions });
      return this.jobPositionService.getJobPosition(searchOptions);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @Put("/:code_job_position")
  updateJobPosition(
    @Param("code_job_position") code_job_position: string,
    @Body() updateJobPosition: UpdateJobPositionDto,
  ) {
    try {
      jobPositionSchema.parse(updateJobPosition);
      validateJobPositionCodeParam.parse({ code_job_position });
      return this.jobPositionService.updateJobPosition(
        updateJobPosition,
        code_job_position,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
