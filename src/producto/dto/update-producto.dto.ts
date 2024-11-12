import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductoDto {
  @ApiProperty({
    description: 'El nombre de la categoria',
    example: 'Enyelberth',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
