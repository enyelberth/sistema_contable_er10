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
import { Group } from "./entities/group.entity";
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

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
//   import { Permissions } from "../access-level/enum/permission.enum";
import { Permissions } from "src/system/access-level/enum/permission.enum";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

import { AuthJwtService } from "src/auth/jwt/jwt.service";
import { CreateModuleDto } from "src/system/modules/dto/module.dto";
import { CreateGroupDto } from "./tdo/group.dto";
import { GroupService } from "./group.service";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(
    private readonly modulesService: GroupService,
    private readonly authJwtService: AuthJwtService
  ) {}

  //metodo get por paginacion
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene los grupos por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description:
      "Palabra clave para buscar los grupos, ya sea por codigo o nombre",
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
                  "codigo del modulo paterno en caso que el modulo sea un hijo o nieto",
              },
              name: {
                type: "string",
                example: "nombre del grupo",
              },
              description: {
                type: "string",
                example: "Descripcion del grupo",
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
  async getGroups(
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


      //  const getData = await this.getData(searchOptions,parseLimit,page);
      return this.modulesService.getGroups(searchOptions, limit, parsePage);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo

  //metodo get de 1 dato
  @ApiBearerAuth()
  @ApiOperation({
    summary: "se obtiene 1 solo grupo buscado por el codigo del grupo",
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
                example: "el codigo del grupo",
              },
              name: {
                type: "string",
                example: "nombre del grupo",
              },
              description: {
                type: "string",
                example: "ruta del grupo",
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
  @Get("/get-group")
  async getGroup(@Query("group_code") module_code: string) {
    try {


      return this.modulesService.getGroup(module_code);

      //  return this.modulesService.getModule(module_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
  //fin del metodo
}
