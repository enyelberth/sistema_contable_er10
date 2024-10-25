import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createUserDto: CreateAccountDto) {
    const user = await this.prisma.Account.create({
      data: createUserDto,
    });
    return {
      status: 200,
      data: user,
    };
  }
  async findAll() {
    const currency = await this.prisma.Account.findMany();
    return {
      status: 200,
      data: currency,
    };
  }
  async findOne(id: number) {
    const currency = await this.prisma.Account.findMany({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: currency,
    };
  }
  async update(id: number, updateUserDto: CreateAccountDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
