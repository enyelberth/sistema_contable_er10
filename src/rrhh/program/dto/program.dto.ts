import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProgramDto {
    @ApiProperty({
        description: 'codigo del programa que se va asignar',
        example: 'codigo del programa comprendido en 2 digitos numericos'
    })
    code: string
    @ApiProperty({
        description: 'codigo del sector para asignarlo al programa',
        example: 'codigo del programa comprendido en 2 digitos numericos'
    })
    sector_code: string
    @ApiProperty({
        description: 'nombre del programa que se va asignar',
        example: 'nombre del programa'
    })
    name: string
    @ApiProperty({
        description: 'descripcion del programa que se va asignar',
        example: 'una descripcion especifica del programa'
    })
    description: string
}

export class UpdateProgramDto {
    @ApiProperty({
        description: 'nombre del programa que se va actualizar',
        example: 'nombre del programa'
    })
    name: string
    @ApiProperty({
        description: 'descripcion del programa que se va actualizar',
        example: 'una descripcion especifica del programa'
    })
    description: string
}

export class UpdatePartialProgramDto extends PartialType(UpdateProgramDto) {}