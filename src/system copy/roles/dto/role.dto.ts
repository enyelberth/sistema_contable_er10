import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    description: "crear nombre del rol a crear",
    example: "rol con poderes",
  })
  @IsNotEmpty()
  @IsString()
  name_role: string;
  @ApiProperty({
    description: "descripcion del papel que tendra el rol",
    example: "este rol podra hacer lo que sea",
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateRoleDto {
  @ApiProperty({
    description: "nombre del rol a actualizar",
    example: "un rol",
  })
  name_role: string;

  @ApiProperty({
    description: "descripcion especifica para actualizar el rol",
    example: "nueva descripcion del rol",
  })
  description: string;
}

export class UpdatePartialRoleDto extends PartialType(UpdateRoleDto) {}
