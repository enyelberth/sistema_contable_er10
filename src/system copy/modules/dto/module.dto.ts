import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateModuleDto {
  @ApiProperty({
    description: "nombre del modulo a crear",
    example: "modulo para crear",
  })
  @IsString()
  @IsNotEmpty()
  name_module: string;
  @ApiProperty({
    description: "recibe el codigo paterno o si es padre no recibe codigo",
    example: "MDL-00001 o vacio",
  })
  pathern_code: string;
  @ApiProperty({
    description: "direccion donde esta alojado el menu creado",
    example: "/src/dashboard/modulo_a_crear",
  })
  src: string;
  @ApiProperty({
    description: "direccion a la que se apunta el icono del modulo",
    example: "/src/assets/icons/icon.ico",
  })
  icon: string;

  @ApiProperty({
    description: 'permiso del usuario',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'VER'
        }
      }
    }
  })

  access: {name:string}[]
}

export class UpdateModuleDto {
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

export class UpdatePartialModuleDto extends PartialType(UpdateModuleDto) {}
