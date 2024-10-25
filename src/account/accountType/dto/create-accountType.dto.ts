import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateaccountTypeDto {
  @ApiProperty({
    description: 'El nombre del tipo de cuenta',
    example: 'Ahorro',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
