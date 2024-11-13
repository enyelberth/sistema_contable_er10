import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalLocationsService } from './physical_locations.service';
import { CreatePhysicalLocationDto } from './dto/create-physical_location.dto';
import { UpdatePhysicalLocationDto } from './dto/update-physical_location.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Physical Locations')
@Controller('physical-locations')
export class PhysicalLocationsController {
  constructor(private readonly physicalLocationsService: PhysicalLocationsService) {}

  @Post()
  create(@Body() createPhysicalLocationDto: CreatePhysicalLocationDto) {
    return this.physicalLocationsService.create(createPhysicalLocationDto);
  }

  @Get()
  findAll() {
    return this.physicalLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalLocationDto: UpdatePhysicalLocationDto) {
    return this.physicalLocationsService.update(+id, updatePhysicalLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalLocationsService.remove(+id);
  }
}
