import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovablePropertyPerRpuService } from './movable_property_per_rpu.service';
import { CreateMovablePropertyPerRpuDto } from './dto/create-movable_property_per_rpu.dto';
import { UpdateMovablePropertyPerRpuDto } from './dto/update-movable_property_per_rpu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movable Property per RPU')
@Controller('movable-property-per-rpu')
export class MovablePropertyPerRpuController {
  constructor(private readonly movablePropertyPerRpuService: MovablePropertyPerRpuService) {}

  @Post()
  create(@Body() createMovablePropertyPerRpuDto: CreateMovablePropertyPerRpuDto) {
    return this.movablePropertyPerRpuService.create(createMovablePropertyPerRpuDto);
  }

  @Get()
  findAll() {
    return this.movablePropertyPerRpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movablePropertyPerRpuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovablePropertyPerRpuDto: UpdateMovablePropertyPerRpuDto) {
    return this.movablePropertyPerRpuService.update(+id, updateMovablePropertyPerRpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movablePropertyPerRpuService.remove(+id);
  }
}
