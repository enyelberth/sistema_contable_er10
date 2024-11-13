import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Request,
  Put,
  Param,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  CreateUserDto,
  ChangePasswordDto,
  ChangePasswordToUserDto,
  UpdateUserDto,
} from "./dto/user.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { AuthJwtService } from "src/auth/jwt/jwt.service";
import {
  password,
  updateUserSchema,
  userCodeValidateParam,
  userSchema,
} from "src/schema/user.schema";
import { ExceptionsMessages } from "src/exceptions/messages/exceptions.messages";
import { searchOptionsSchema, tableSchema } from "src/schema/extras.schema";

@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @ApiBearerAuth()
  @ApiProperty({
    description: "crea un usuario",
    type: CreateUserDto,
  })
  @ApiOperation({ summary: "crea un usuario" })
  @ApiCreatedResponse({
    description: "mensaje de retorno cuando la creacion del usuario es exitosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "Usuario creado con exito",
        },
      },
    },
  })
  @ApiConflictResponse({
    description: "mensaje de retorno cuando el usuario ya existe",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "El usuario ya existe",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() user: CreateUserDto, @Request() req: any) {
    try {
      userSchema.parse(user);
      return this.userService.createUser(user, req.userCode);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "obtiene todos los usuarios por paginacion",
  })
  @ApiQuery({
    name: "searchOptions",
    required: true,
    allowEmptyValue: true,
    description: "palabra reservada para filrar los datos",
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(
    @Query("searchOptions") searchOptions: string,
    @Query("limit") limit: string,
    @Query("page") page: string,
  ) {
    try {
      const parseLimit = parseInt(limit);
      const parsePage = parseInt(page);
      tableSchema.parse({
        searchOptions,
        limit,
        page: parsePage,
      });
      return this.userService.getUsers(searchOptions, parseLimit, parsePage);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("/get-user")
  getUser(@Query("searchOptions") searchOptions: string) {
    try {
      searchOptionsSchema.parse({
        searchOptions,
      });
      return this.userService.getUser(searchOptions);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiProperty({
    description: "el usuario puede cambiar su password",
    type: ChangePasswordDto,
  })
  @ApiOperation({ summary: "cambia el password del usuario" })
  @ApiCreatedResponse({
    description:
      "mensaje de retorno cuando la actualizacion del password es exitosa",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "success",
        },
        message: {
          type: "string",
          example: "CLAVE ACTUALIZADA CON EXITO",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      "mensaje de retorno cuando la clave actual no coincide para validar el cambio",
    schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          example: "info",
        },
        message: {
          type: "string",
          example: "LA CLAVE ACTUAL ES INVALIDA",
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: "mensaje de retorno cuando hay un error interno",
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
            "ERROR EN EL ENVIO DE DATOS O AL CONECTAR CON LA BASE DE DATOS",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Put("change-password")
  async changePassword(
    @Request() req,
    @Body() changePassword: ChangePasswordDto,
  ) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = this.authJwtService.decoder(token);
    const user_code = decodedToken.userData.code;
    try {
      password.parse(changePassword);
      return this.userService.updatePassword(user_code, changePassword);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put("change-password/:user_code")
  async changePasswordToUser(
    @Param("user_code") user_code: string,
    @Body() changeUserPassword: ChangePasswordToUserDto,
  ) {
    try {
      password.parse(changeUserPassword);
      return this.userService.updatePasswordToUser(
        user_code,
        changeUserPassword,
      );
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }

  @ApiBearerAuth()
  @ApiProperty({
    description: "ACTUALIZA UN USUARIO",
    type: UpdateUserDto,
  })
  @ApiParam({
    name: "user_code",
    description: "codigo de usuario que actualizara datos",
    example: "USR-00000",
  })
  @UseGuards(JwtAuthGuard)
  @Put("/:user_code")
  async updateUser(
    @Param("user_code") user_code: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    try {
      userCodeValidateParam.parse({ user_code });
      updateUserSchema.parse(updateUser);
      return this.userService.updateUser(updateUser, user_code);
    } catch (error) {
      ExceptionsMessages.schemaError("info", error.message);
    }
  }
}
