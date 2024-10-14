import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GastoService {
  prisma: any;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createGastoDto: CreateGastoDto) {
    const gasto = await this.prisma.Gasto.createMany({
      data: {
        description: createGastoDto.description,
        monto: parseFloat(createGastoDto.monto),
        categoriaId: 2,
      },
    });
    return {
      status: 200,
      data: gasto,
    };
  }

  async findAll() {
    const gasto = await this.prisma.Gasto.findMany();

    return {
      status: 200,
      data: gasto,
    };
  }

  async findOne(id: number) {
    const gasto = await this.prisma.Gasto.findMany({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: gasto,
    };
  }

  async update(id: number, gasto: CreateGastoDto) {
    const updateDate = await this.prisma.Gasto.updateMany({
      where: {
        id: id,
      },
      data: {
        monto: gasto.monto,
      },
    });
    return {
      status: 200,
      data: updateDate,
    };
  }

  async remove(id: number) {
    const deletegasto = await this.prisma.Gasto.deleteMany({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: deletegasto,
    };
  }
}
