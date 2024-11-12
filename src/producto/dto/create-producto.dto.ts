import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'El nombre de la categoria',
    example: 'Enyelberth',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
