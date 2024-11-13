import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "codigo del rol al que se le asignara el usuario",
    example: "RLU-00000",
  })
  role_code: string;
  @ApiProperty({
    description:
      "codigo del empleado al que se relacionara el usuario, debe existir el empleado para poder crear un usuario",
    example: "EMP-00000",
  })
  employeed_code: string;
  @ApiProperty({
    description: "codigo del estatus del usuario por defecto sera activo",
    example: "STS-00001",
  })
  status_code: string;
  @ApiProperty({
    description: "nombre de usuario a crear",
    example: "jhondoe",
  })
  username: string;
  @ApiProperty({
    description: "password del usuario",
    example: "password_stronger",
  })
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: "password a actualizar",
    example: "password_stronger",
  })
  currentPassword: string;
  @ApiProperty({
    description: "password a actualizar",
    example: "password_stronger",
  })
  newPassword: string;
}

export class ChangePasswordToUserDto {
  @ApiProperty({
    description: "password a actualizar",
    example: "password_stronger",
  })
  newPassword: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: "codigo del rol para actualizar el usuario",
    example: "RLU-00000",
  })
  role_code: string;
  @ApiProperty({
    description: "codigo del estatus para actualizar el usuario",
    example: "STS-00001",
  })
  status_code: string;
  @ApiProperty({
    description: "propiedad que habilita o deshabilita el usuario",
    example: true,
  })
  enabled: boolean;
}
