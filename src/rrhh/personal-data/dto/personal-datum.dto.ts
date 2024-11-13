import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonalDatumDto {
    @ApiProperty({
        description: "primer nombre de la persona",
        example: "Jhon"
    })
    first_name: string;
    @ApiProperty({
        description: "apellido de la persona",
        example: "Doe"
    })
    last_name: string;
    @ApiProperty({
        description: "acronimo de la identificacion de la persona ya sea V, E, J, etc",
        example: "V"
    })
    identify_acronym: string;
    @ApiProperty({
        description: "numero de identificacion de la persona",
        example: "00000000"
    })
    identify_number: string;
    @ApiProperty({
        description: "fecha de nacimiento de la persona",
        example: "1991/09/21"
    })
    birth_date: Date;
    @ApiProperty({
        description: "genero de la persona",
        example: "masculino"
    })
    gender: string;
    @ApiProperty({
        description: "numero telefonico personal o local de la persona",
        example: "02512328986"
    })
    phone_number: string;
    @ApiProperty({
        description: "direccion de hogar de la persona",
        example: "carrera 14 entre calles 31 y 32"
    })
    home_address: string;
}
