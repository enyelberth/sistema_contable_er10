import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { PrismaClient } from '@prisma/client';
import { Ingreso } from './entities/ingreso.entity';

@Injectable()
export class IngresosService {
  prisma: any;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createIngresoDto: CreateIngresoDto) {
    const ingresos = await this.prisma.Ingresos.create({
      data: {
        description: createIngresoDto.description,
        monto: parseFloat(createIngresoDto.monto),
        categoriaId: 2,
      },
    });
    return {
      status: 200,
      data: ingresos,
    };
  }
  async findAll() {
    const datos = await this.prisma.Ingresos.findMany();

    return {
      status: 200,
      data: datos,
    };
  }
  async findOne(id: number) {
    const dato = await this.prisma.Ingresos.findMany({
      where: {
        id: id,
      },
    });

    return {
      status: 200,
      data: dato,
    };
  }
  async update(id: number, dato: CreateIngresoDto) {
    const updateDate = await this.prisma.Ingresos.updateMany({
      where: {
        id: id,
      },
      data: {
        monto: dato.monto,
      },
    });
    return {
      status: 200,
      data: updateDate,
    };
  }
  async remove(id: number) {
    const deleteIngreso = await this.prisma.Ingresos.deleteMany({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: deleteIngreso,
    };
  }
}
