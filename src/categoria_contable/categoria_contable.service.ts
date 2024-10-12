import { Injectable } from '@nestjs/common';
import { CreateCategoriaContableDto } from './dto/create-categoria_contable.dto';
import { UpdateCategoriaContableDto } from './dto/update-categoria_contable.dto';

@Injectable()
export class CategoriaContableService {
  create(createCategoriaContableDto: CreateCategoriaContableDto) {
    return 'This action adds a new categoriaContable';
  }

  findAll() {
    return `This action returns all categoriaContable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaContable`;
  }

  update(id: number, updateCategoriaContableDto: UpdateCategoriaContableDto) {
    return `This action updates a #${id} categoriaContable`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaContable`;
  }
}
