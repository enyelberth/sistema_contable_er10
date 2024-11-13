import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { SubGroupService } from "../subgroup/subgroup.service";
import { AuthJwtService } from "../../auth/jwt/jwt.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { tableSchema } from "src/schema/extras.schema";
import { SectionService } from "./section.service";
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
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Section } from "./entities/section.entity";

@ApiTags("Section")
@Controller("section")
export class SectionController {
  constructor(
    private readonly modulesService: SectionService,
    private readonly AuthJwtService: AuthJwtService
  ) {}
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene los section por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description:
      "Palabra clave para buscar los section, ya sea por codigo o nombre",
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
              id: {
                type: "number",
                example: "el codigo del section",
              },
              code: {
                type: "string",
                example: "codigo del section",
              },
              name: {
                type: "string",
                example: "nombre del section",
              },
              description: {
                type: "string",
                example: "Descripcion del section",
              },
              group_code: {
                type: "string",
                example: "Codigo del section",
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
  async getSections(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
    @Request() req: any
  ) {
    try {
      const parsePage = parseInt(page);

      tableSchema.parse({
        searchOptions,
        limit,
        page: parsePage,
      });
      console.log("asd");

      return this.modulesService.getSections(searchOptions, limit, parsePage);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "se obtiene 1 solo section buscado por el codigo del section",
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
              id: {
                type: "number",
                example: "el codigo del Section",
              },
              code: {
                type: "string",
                example: "codigo del section",
              },
              name: {
                type: "string",
                example: "nombre del section",
              },
              description: {
                type: "string",
                example: "Descripcion del section",
              },
              group_code: {
                type: "string",
                example: "Codigo del section",
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
  @Get("/get-section")
  async getSection(@Query("section_code") section_code: string) {
    try {
      return this.modulesService.getSection(section_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
