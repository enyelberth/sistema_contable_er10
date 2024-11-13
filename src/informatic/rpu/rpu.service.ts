import { Injectable } from '@nestjs/common';
import { CreateRpuDto } from './dto/create-rpu.dto';
import { UpdateRpuDto } from './dto/update-rpu.dto';

@Injectable()
export class RpuService {
  create(createRpuDto: CreateRpuDto) {
    return 'This action adds a new rpu';
  }

  findAll() {
    return `This action returns all rpu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rpu`;
  }

  update(id: number, updateRpuDto: UpdateRpuDto) {
    return `This action updates a #${id} rpu`;
  }

  remove(id: number) {
    return `This action removes a #${id} rpu`;
  }
}
