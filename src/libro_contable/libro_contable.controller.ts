import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibroContableService } from './libro_contable.service';
import { CreateLibroContableDto } from './dto/create-libro_contable.dto';
import { UpdateLibroContableDto } from './dto/update-libro_contable.dto';

@Controller('libro-contable')
export class LibroContableController {
  constructor(private readonly libroContableService: LibroContableService) {}

  @Post()
  create(@Body() createLibroContableDto: CreateLibroContableDto) {
    return this.libroContableService.create(createLibroContableDto);
  }

  @Get()
  findAll() {
    return this.libroContableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libroContableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibroContableDto: UpdateLibroContableDto) {
    return this.libroContableService.update(+id, updateLibroContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroContableService.remove(+id);
  }
}
