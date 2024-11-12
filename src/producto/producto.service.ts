import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CreateProductoDto } from './dto/create-producto.dto';
@Injectable()
export class ProductoService {
  prisma: any;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createProductoDto: CreateProductoDto) {
    console.log(createProductoDto.name);

    const createCa = await this.prisma.categorias.create({
      data: {
        name: createProductoDto.name,
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
  async update(id: number, updateProducto: UpdateProductoDto) {
    console.log(updateProducto);
    return `This action updates a #${id} categoria`;
  }
  async remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
