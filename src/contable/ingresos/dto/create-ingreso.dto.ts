import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateIngresoDto {
  @ApiProperty({
    description: 'Descripcion del ingreso',
    example: 'Tranferencia',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    description: 'Monto de la cantidad que ingresamos',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  monto: string;

  @ApiProperty({
    description: 'Categoria del id tipo de ingreso',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  categoriaId: string;
}
