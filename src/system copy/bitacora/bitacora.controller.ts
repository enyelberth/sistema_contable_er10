import { Controller, Query, Get, UseGuards } from "@nestjs/common";
import { BitacoraService } from "./bitacora.service";
import { tableSchema } from "src/schema/extras.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Bitacora")
@Controller("bitacora")
export class BitacoraController {
  constructor(private readonly bitacoraService: BitacoraService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "obtiene todos los registros de las acciones que se realicen en el sistema",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description: "palabra reservada para filtrar los datos",
  })
  @ApiQuery({
    name: "from",
    required: false,
    allowEmptyValue: true,
    description: "filtro para la busqueda de registros por fecha",
  })
  @ApiQuery({
    name: "to",
    required: false,
    allowEmptyValue: true,
    description: "filtro para la busqueda de registros por fecha",
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getLogs(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
    @Query("from") from: string,
    @Query("to") to: string,
  ) {
    try {
      const parseLimit = parseInt(limit);
      const parsePage = parseInt(page);
      tableSchema.parse({
        searchOptions,
        limit,
        page: parsePage,
      });
      return this.bitacoraService.getBitacora(
        searchOptions,
        from,
        to,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene el detalle de la accion realizada por el usuario",
  })
  @ApiQuery({
    name: "id",
    required: true,
    allowEmptyValue: false,
    description: "numero de identificacion del registro para ver a detalle",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/log-detail")
  getDetailBitacora(@Query("id") id: number) {
    return this.bitacoraService.getDetailBitacora(id);
  }
}
