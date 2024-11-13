import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PersonalDataService } from "./personal-data.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";

@ApiTags("Personal Data")
@Controller("personal-data")
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) {}

  @ApiProperty()
  @ApiOperation({
    summary: "consula todas las personas registradas por paginacion",
  })
  @ApiOkResponse({
    description: "Mensaje de retorno cuando la consulta sea existosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "sucess",
        },
        message: {
          type: "string",
          example: "Datos obtenidos con exito",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "mensaje de retorno cuando la consulta no obtiene los datos",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "No hay datos para mostrar",
        },
      },
    },
  })
  @ApiParam({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description:
      "Palabra clave para buscar el modulo, ya sea por codigo o nombre",
  })
  @ApiParam({
    name: "limit",
    required: true,
    description: "limite de dato a mostrar en el grid",
  })
  @ApiParam({
    name: "page",
    required: true,
    description: "todas las paginas por limite de dato se inicia en el 0",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getPerson(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: number,
    @Query("page") page: number,
  ) {
    // return this.personalDataService.getPerson(searchOptions, limit, page);
  }
}
