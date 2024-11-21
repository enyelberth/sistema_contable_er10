import { Injectable } from '@nestjs/common';

// import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaClient} from '@prisma/client'
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(transaction: CreateTransactionDto) {
    const a = transaction;

    const user = await this.prisma.Usuarios.findMany();
    return {
      status: 200,
      data: user,
    };
  }

  async findAll() {
    const transaction = await this.prisma.Usuarios.findMany();
    return {
      status: 200,
      data: transaction,
    };
  }

  async findOne(id: number) {
    const transaction = await this.prisma.Usuarios.findMany({
      where: {
        id: id,
      },
    });

    return {
      status: 200,
      data: transaction,
    };
  }

  async update(id: number, updateUserDto: CreateTransactionDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
