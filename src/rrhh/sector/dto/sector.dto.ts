import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger"

export class CreateSectorDto {
    @ApiProperty({
        description: 'codigo del sector que se va asignar',
        example: 'codigo del sector comprendido en 2 digitos numericos'
    })
    code: string
    @ApiProperty({
        description: 'nombre del sector que se va asignar',
        example: 'nombre del sector'
    })
    name: string
    @ApiProperty({
        description: 'descripcion del sector que se va asignar',
        example: 'una descripcion especifica del sector'
    })
    description: string
}

export class UpdateSectorDto {
    @ApiProperty({
        description: 'nombre del sector que se va actualizar',
        example: 'nombre del sector'
    })
    name: string
    @ApiProperty({
        description: 'descripcion del sector que se va actualizar',
        example: 'una descripcion especifica del sector'
    })
    description: string
}

export class UpdatePartialSectorDto extends PartialType(UpdateSectorDto) {}