import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalLocationEmployedsService } from './physical_location_employeds.service';
import { CreatePhysicalLocationEmployedDto } from './dto/create-physical_location_employed.dto';
import { UpdatePhysicalLocationEmployedDto } from './dto/update-physical_location_employed.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Physical Location Employee')
@Controller('physical-location-employeds')
export class PhysicalLocationEmployedsController {
  constructor(private readonly physicalLocationEmployedsService: PhysicalLocationEmployedsService) {}

  @Post()
  create(@Body() createPhysicalLocationEmployedDto: CreatePhysicalLocationEmployedDto) {
    return this.physicalLocationEmployedsService.create(createPhysicalLocationEmployedDto);
  }

  @Get()
  findAll() {
    return this.physicalLocationEmployedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalLocationEmployedsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalLocationEmployedDto: UpdatePhysicalLocationEmployedDto) {
    return this.physicalLocationEmployedsService.update(+id, updatePhysicalLocationEmployedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalLocationEmployedsService.remove(+id);
  }
}
