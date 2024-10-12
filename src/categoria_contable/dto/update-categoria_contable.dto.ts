import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaContableDto } from './create-categoria_contable.dto';

export class UpdateCategoriaContableDto extends PartialType(CreateCategoriaContableDto) {}
