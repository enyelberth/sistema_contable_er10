import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { EmployeedService } from "./employeed.service";
import { CreateEmployeedDto, UpdateEmployeDto } from "./dto/employeed.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
  ApiParam,
  getSchemaPath,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import {
  employCodeValidation,
  employeeSchema,
  identifyNumberSchema,
  updateEmployeeSchema,
} from "src/schema/employee.schema";
import { tableSchema, searchOptionsSchema } from "src/schema/extras.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { coerce, z } from "zod";

@ApiTags("Employee")
@Controller("employeed")
export class EmployeedController {
  constructor(private readonly employeedService: EmployeedService) {}

  @ApiProperty()
  @ApiBearerAuth()
  @ApiOperation({ summary: "crea un empleado" })
  @ApiBody({
    description: "crea un empleado",
    type: CreateEmployeedDto,
  })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando se cree un empleado con exito",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "empleado creado con exito",
        },
      },
    },
  })
  @ApiConflictResponse({
    description: "mensaje de retorno cuando ya existe el empleado",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "El empleado ya esta registrado",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createEmployee(@Body() employee: CreateEmployeedDto) {
    try {
      employeeSchema.parse(employee);
      return this.employeedService.createEmployeed(employee);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "Obtiene los datos del empleado por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description: "Busca por cedula o por el cargo",
  })
  @ApiQuery({
    name: "limit",
    required: true,
    description: "valor para mostrar los datos en el grid",
  })
  @ApiQuery({
    name: "page",
    required: true,
    description: "valor de las paginas para ver los datos a traves del grid",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getEmployees(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parsePage = parseInt(page);
      const parseLimit = parseInt(limit);
      tableSchema.parse({ searchOptions, limit, page: parsePage });
      return this.employeedService.getEmployees(
        searchOptions,
        parseLimit,
        parsePage,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiOperation({
    summary: "Obtiene la informacion de un empleado especifico",
  })
  @ApiQuery({
    name: "identify_number",
    required: true,
    description: "numero de cedula de la persona a buscar",
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/get-employe/")
  getEmployee(@Query("identify_number") identify_number: string) {
    try {
      identifyNumberSchema.parse({ identify_number });
      return this.employeedService.getEmployed(identify_number);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "actualiza un empleado",
  })
  @ApiBody({
    description: "dto para actualizar un empleado",
    type: UpdateEmployeDto,
  })
  @ApiParam({
    name: "employ_code",
    description: "codigo empleado para actualizar",
    example: "EMP-00000",
  })
  @UseGuards(JwtAuthGuard)
  @Put("/:employ_code")
  updateEmploy(
    @Param("employ_code") employ_code: string,
    @Body() updateEmploy: UpdateEmployeDto,
  ) {
    try {
      const dateString = updateEmploy.birth_date;
      const date = new Date(dateString);
      updateEmploy.birth_date = date;
      updateEmployeeSchema.parse(updateEmploy);
      employCodeValidation.parse({ employ_code });
      return this.employeedService.updateEmployed(updateEmploy, employ_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
