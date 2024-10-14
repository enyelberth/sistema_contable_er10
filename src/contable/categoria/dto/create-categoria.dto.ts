import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCategoriaDto {
  @ApiProperty({
    description: 'El nombre de la categoria',
    example: 'Enyelberth',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
