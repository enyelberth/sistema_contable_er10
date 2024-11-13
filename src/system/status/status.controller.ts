import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { StatusService } from "./status.service";
import { CreateStatusDto } from "./dto/status.dto";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { tableSchema } from "src/schema/extras.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";

@ApiTags("User Status")
@Controller("status")
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({
    summary: "se crea un status nuevo en caso de que se requiera",
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se crea un status exitosamente",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "El status se ha creado con exito",
        },
      },
    },
  })
  @ApiConflictResponse({
    description: "mensaje de retorno cuando existe el status",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "el status ya esta registrado",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createStatus(createStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "metodo para obtener los estatus asociado con el usuario",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description: "Palabra clave para buscar el estatus del usuario",
  })
  @ApiQuery({
    name: "limit",
    required: true,
    description: "limite de datos a mostrar en el grid",
  })
  @ApiQuery({
    name: "page",
    required: true,
    description: "numero de pagina se inicia en 0",
  })
  @Get()
  async getStatus(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      tableSchema.parse({
        searchOptions,
        limit,
        page: parsePage,
      });
      const parseLimit = parseInt(limit);
      return this.statusService.findStatus(
        searchOptions,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
