import { Controller, Get, Query, Request,UseGuards } from "@nestjs/common";
import { SubGroupService } from "./subgroup.service";
import { AuthJwtService } from "../../auth/jwt/jwt.service";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { tableSchema } from "src/schema/extras.schema";
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

@ApiTags("SubGroup")
@Controller("subgroup")
export class SubGroupController {
  constructor(
    private readonly modulesService: SubGroupService,
    private readonly AuthJwtService: AuthJwtService
  ) {}
@Get()

@ApiBearerAuth()
@ApiOperation({
  summary: "obtiene los subgrupos por paginacion",
})
@ApiQuery({
  name: "searchOptions",
  required: true,
  allowEmptyValue: true,
  description:
    "Palabra clave para buscar los subgrupos, ya sea por codigo o nombre",
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
              example: "el codigo del Grupo",
            },
            code: {
              type: "string",
              example:
                "codigo del subgroup",
            },
            name: {
              type: "string",
              example: "nombre del subgrupo",
            },
            description: {
              type: "string",
              example: "Descripcion del Subgrupo",
            },
            group_code: {
              type: "string",
              example: "Codigo del grupo",
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

async getSubGroups(
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

        return this.modulesService.getSubGroups(
            searchOptions,
            limit,
            parsePage,
        );

    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

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
              id: {
                type: "number",
                example: "el codigo del Grupo",
              },
              code: {
                type: "string",
                example:
                  "codigo del subgroup",
              },
              name: {
                type: "string",
                example: "nombre del subgrupo",
              },
              description: {
                type: "string",
                example: "Descripcion del Subgrupo",
              },
              group_code: {
                type: "string",
                example: "Codigo del grupo",
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
  @Get("/get-subgroup")
async getSubGrop(@Query("subgroup_code") subgrouo_code: string){
  try {
    console.log("hola")
    const code = subgrouo_code;

    return this.modulesService.getSubGroup(code);

     
  } catch (error) {
  ExceptionsMessages.schemaError("info",error.message);
  }

}
}
