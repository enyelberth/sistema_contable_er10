import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroContableDto } from './create-libro_contable.dto';

export class UpdateLibroContableDto extends PartialType(CreateLibroContableDto) {}
