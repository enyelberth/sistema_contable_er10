import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaContableService } from './categoria_contable.service';
import { CreateCategoriaContableDto } from './dto/create-categoria_contable.dto';
import { UpdateCategoriaContableDto } from './dto/update-categoria_contable.dto';

@Controller('categoria-contable')
export class CategoriaContableController {
  constructor(private readonly categoriaContableService: CategoriaContableService) {}

  @Post()
  create(@Body() createCategoriaContableDto: CreateCategoriaContableDto) {
    return this.categoriaContableService.create(createCategoriaContableDto);
  }

  @Get()
  findAll() {
    return this.categoriaContableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaContableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaContableDto: UpdateCategoriaContableDto) {
    return this.categoriaContableService.update(+id, updateCategoriaContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaContableService.remove(+id);
  }
}
