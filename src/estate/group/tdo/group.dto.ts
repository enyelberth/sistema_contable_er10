import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
  @ApiProperty({
    description: "nombre del grupo a crear",
    example: "Id del grupo",
  })
  @IsString()
  @IsNotEmpty()
  id: number;
  @ApiProperty({
    description: "Recibe un valor numerico",
    example: "23  ",
  })
  code: string;
  @ApiProperty({
    description: "Codigo dsassafdel grupo",
    example: "Nombre del grupo",
  })
  name: string;
  @ApiProperty({
    description: "Nombre del grupo",
    example: "Descripcioon",
  })
  description: string;


}

export class UpdateGroupDto {
  @ApiProperty({
    description: "recibe el codigo paterno o si es padre no recibe codigo",
    example: "MDL-00001 o vacio",
  })
  pathern_code: string;
  @ApiProperty({
    description: "nombre del modulo que se va actualizar",
    example: "modulo a actualizar",
  })
  name_module: string;
  @ApiProperty({
    description: "direccion del modulo que se va actualizar",
    example: "/src/dashboard/otra_direccion",
  })
  src: string;
  @ApiProperty({
    description: "direccion del icono que se va actualizar",
    example: "/src/assets/icons/otro_icon",
  })
  icon: string;
  @ApiProperty({
    description:
      "propiedad del menu si se activa o no en caso de desactivar el modulo no va usarse en ninguna parte",
    example: false,
  })
  active: boolean;
}

export class UpdatePartialModuleDto {}
