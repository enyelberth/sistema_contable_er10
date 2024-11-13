import { ApiProperty } from "@nestjs/swagger";

export class CreateStatusDto {
  @ApiProperty({
    description: "se coloca el nombre del estatus nuevo que se desee crear en caso de necesitarlo para el usuario",
    example: "de vacaciones"
  })
  name: string;
  @ApiProperty({
    description: "se colocal una descripcion al estatus",
    example: "se fue de vacaciones"
  })
  description: string;
}
