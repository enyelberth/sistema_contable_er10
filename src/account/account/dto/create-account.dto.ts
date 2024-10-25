import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'El nombre del tipo de cuenta',
    example: 'Ahorro',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
