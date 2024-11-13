import { Injectable } from '@nestjs/common';
import { CreateMovablePropertyPerRpuDto } from './dto/create-movable_property_per_rpu.dto';
import { UpdateMovablePropertyPerRpuDto } from './dto/update-movable_property_per_rpu.dto';

@Injectable()
export class MovablePropertyPerRpuService {
  create(createMovablePropertyPerRpuDto: CreateMovablePropertyPerRpuDto) {
    return 'This action adds a new movablePropertyPerRpu';
  }

  findAll() {
    return `This action returns all movablePropertyPerRpu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movablePropertyPerRpu`;
  }

  update(id: number, updateMovablePropertyPerRpuDto: UpdateMovablePropertyPerRpuDto) {
    return `This action updates a #${id} movablePropertyPerRpu`;
  }

  remove(id: number) {
    return `This action removes a #${id} movablePropertyPerRpu`;
  }
}
