import { IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateModulePartialDto {
  @ApiProperty({
    description: "recibe el codigo paterno o si es padre no recibe codigo",
    example: "MDL-00001 o vacio",
  })
  @IsOptional()
  pathern_code: string;

  @ApiProperty({
    description: "nombre del modulo que se va actualizar",
    example: "nombre de modulo parcial",
  })
  @IsOptional()
  name_module: string;
  @ApiProperty({
    description: "direccion del modulo que se va actualizar",
    example: "/src/dashboard/direccion_del_modulo_parcial",
  })
  @IsOptional()
  src: string;
  @ApiProperty({
    description: "direccion del icono que se va a actualizar",
    example: "/src/assets/icons/direccion_icon_parcial",
  })
  @IsOptional()
  icon: string;
  @ApiProperty({
    description: "propiedad del modulo para activar o desactivar del sistema",
    example: true,
  })
  @IsOptional()
  active: boolean;
}
