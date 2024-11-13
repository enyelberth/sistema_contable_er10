import { Injectable } from '@nestjs/common';
import { CreatePhysicalLocationDto } from './dto/create-physical_location.dto';
import { UpdatePhysicalLocationDto } from './dto/update-physical_location.dto';

@Injectable()
export class PhysicalLocationsService {
  create(createPhysicalLocationDto: CreatePhysicalLocationDto) {
    return 'This action adds a new physicalLocation';
  }

  findAll() {
    return `This action returns all physicalLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalLocation`;
  }

  update(id: number, updatePhysicalLocationDto: UpdatePhysicalLocationDto) {
    return `This action updates a #${id} physicalLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} physicalLocation`;
  }
}
