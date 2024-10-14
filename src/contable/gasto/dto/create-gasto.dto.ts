import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateGastoDto {
  @ApiProperty({
    description: 'Descripcion del gasto que realizamos',
    example: 'Gasto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    description: 'Monto de la cantidad que gastamos',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  monto: string;

  @ApiProperty({
    description: 'Categoria del tipo de gasto',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  categoriaId: string;
}
