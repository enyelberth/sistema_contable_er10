import { Injectable } from '@nestjs/common';
import { CreateLibroContableDto } from './dto/create-libro_contable.dto';
import { UpdateLibroContableDto } from './dto/update-libro_contable.dto';

@Injectable()
export class LibroContableService {
  create(createLibroContableDto: CreateLibroContableDto) {
    return 'This action adds a new libroContable';
  }

  findAll() {
    return `This action returns all libroContable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} libroContable`;
  }

  update(id: number, updateLibroContableDto: UpdateLibroContableDto) {
    return `This action updates a #${id} libroContable`;
  }

  remove(id: number) {
    return `This action removes a #${id} libroContable`;
  }
}
