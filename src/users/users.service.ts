import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.Usuarios.findMany();
    return {
      status: 200,
      data: user,
    };
  }

  async findAll(id: number) {
    const user = await this.prisma.Usuarios.findMany({
      where: {
        id: id,
      },
    });

    return {
      status: 200,
      data: user,
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
