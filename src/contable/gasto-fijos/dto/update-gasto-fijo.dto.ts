import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoFijoDto } from './create-gasto-fijo.dto';

export class UpdateGastoFijoDto extends PartialType(CreateGastoFijoDto) {}
