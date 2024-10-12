import { PartialType } from '@nestjs/mapped-types';
import { CreateIngresosFijoDto } from './create-ingresos-fijo.dto';

export class UpdateIngresosFijoDto extends PartialType(CreateIngresosFijoDto) {}
