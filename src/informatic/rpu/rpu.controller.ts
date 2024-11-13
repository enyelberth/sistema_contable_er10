import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RpuService } from './rpu.service';
import { CreateRpuDto } from './dto/create-rpu.dto';
import { UpdateRpuDto } from './dto/update-rpu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RPU')
@Controller('rpu')
export class RpuController {
  constructor(private readonly rpuService: RpuService) {}

  @Post()
  create(@Body() createRpuDto: CreateRpuDto) {
    return this.rpuService.create(createRpuDto);
  }

  @Get()
  findAll() {
    return this.rpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rpuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRpuDto: UpdateRpuDto) {
    return this.rpuService.update(+id, updateRpuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rpuService.remove(+id);
  }
}
