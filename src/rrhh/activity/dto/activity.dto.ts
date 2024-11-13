import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateActivityDto {
  @ApiProperty({
    description: "codigo de la actividad",
    example: "00",
  })
  code: string;
  @ApiProperty({
    description: "codigo del programa que se le va asignar a la actividad",
    example: "00",
  })
  program_code: string;
  @ApiProperty({
    description: "nombre de la actividad que se va asignar",
    example: "nombre de la actividad",
  })
  name: string;
  @ApiProperty({
    description: "descripcion de la actividad que se va asignar",
    example: "una descripcion especifica de la actividad",
  })
  description: string;
}

export class UpdateActivityDto {
  @ApiProperty({
    description: "nombre de la actividad que se va actualizar",
    example: "nombre de la actividad",
  })
  name: string;
  @ApiProperty({
    description: "descripcion de la actividad que se va actualizar",
    example: "una descripcion especifica de la actividad",
  })
  description: string;
}

export class UpdatePartialActivityDto extends PartialType(UpdateActivityDto) {}
