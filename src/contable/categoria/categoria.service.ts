import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriaService {
  prisma: any;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createCategoriaDto: CreateCategoriaDto) {
    console.log(createCategoriaDto.name);

    const createCa = await this.prisma.categorias.create({
      data: {
        name: createCategoriaDto.name,
      },
    });
    console.log(createCa);
    return {
      status: 200,
      data: createCa,
    };
  }

  async findAll() {
    const datos = await this.prisma.categorias.findMany();
    return {
      status: 200,
      data: datos,
    };
  }

  async findOne(id: number) {
    const datos = await this.prisma.catiegorias.findMany({
      where: {
        id: 1,
      },
    });
    return {
      status: 200,
      data: datos,
    };
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  async remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
