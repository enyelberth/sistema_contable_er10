import { ApiProperty } from "@nestjs/swagger";

export class CreateAdministrativeUnitDto {
  @ApiProperty({
    description: "codigo del sector",
    example: "01",
  })
  sector_code: string;

  @ApiProperty({
    description: "codigo del programa",
    example: "06",
  })
  program_code: string;

  @ApiProperty({
    description: "codigo de la actividad",
    example: "00",
  })
  activity_code: string;

  @ApiProperty({
    description: "nombre de la unidad ejecutora",
    example: "OFICINA DE INFORMATICA",
  })
  name: string;

  @ApiProperty({
    description: "descripcion general de la unidad ejecutora",
    example: "OFICINA ENCARGADA DE LOS SISTEMA",
  })
  description: string;
}

export class UpdateAdministrativeUnitDto {
  @ApiProperty({
    description: "nombre de la unidad que se va a actualizar",
    example: "OFICINA DE INFORMATICA",
  })
  name: string;

  @ApiProperty({
    description: "descripcion general de la unidad que se va a actualizar",
    example: "OFICINA ENCARGADA DE LOS SISTEMAS",
  })
  description: string;
}
