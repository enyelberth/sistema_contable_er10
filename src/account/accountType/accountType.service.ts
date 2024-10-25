import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateaccountTypeDto } from './dto/create-accountType.dto';

@Injectable()
export class AccountTypeService {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createUserDto: CreateaccountTypeDto) {
    const user = await this.prisma.Usuarios.create({
      data: createUserDto,
    });
    return {
      status: 200,
      data: user,
    };
  }
  async findAll() {
    const currency = await this.prisma.Currency.findMany();
    return {
      status: 200,
      data: currency,
    };
  }
  async findOne(id: number) {
    const currency = await this.prisma.Currency.findMany({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: currency,
    };
  }
  async update(id: number, updateUserDto: CreateaccountTypeDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
