import { ApiProperty } from "@nestjs/swagger";

export class CreateJobPositionDto {
  @ApiProperty({
    description: "nombre del cargo o puesto de trabajo",
    example: "Coordinador de sistemas",
  })
  name: string;
  @ApiProperty({
    description: "descripcion detallada sobre el cargo o puesto de trabajo",
    example:
      "se encarga de suvervisar todos las tareas de los sistemas en produccion y darle solucion a posibles fallas que se lleguen a presentar",
  })
  description: string;
}

export class UpdateJobPositionDto {
  @ApiProperty({
    description: "nombre del cargo que se va actualizar",
    example: "otro cargo",
  })
  name: string;
  @ApiProperty({
    description: "descripcion del nuevo cargo",
    example: "la nueva descripcion que tendra el nuevo cargo",
  })
  description: string;
}
