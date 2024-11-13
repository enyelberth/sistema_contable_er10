import { Injectable } from '@nestjs/common';
import { CreatePhysicalLocationEmployedDto } from './dto/create-physical_location_employed.dto';
import { UpdatePhysicalLocationEmployedDto } from './dto/update-physical_location_employed.dto';

@Injectable()
export class PhysicalLocationEmployedsService {
  create(createPhysicalLocationEmployedDto: CreatePhysicalLocationEmployedDto) {
    return 'This action adds a new physicalLocationEmployed';
  }

  findAll() {
    return `This action returns all physicalLocationEmployeds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalLocationEmployed`;
  }

  update(id: number, updatePhysicalLocationEmployedDto: UpdatePhysicalLocationEmployedDto) {
    return `This action updates a #${id} physicalLocationEmployed`;
  }

  remove(id: number) {
    return `This action removes a #${id} physicalLocationEmployed`;
  }
}
