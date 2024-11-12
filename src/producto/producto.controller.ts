import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateCategoriaDto } from 'src/contable/categoria/dto/create-categoria.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { UpdateProductoDto } from './dto/update-producto.dto';
@Controller('categoria')
@ApiTags('Categoria')
export class ProductoController {
  constructor(private readonly ProductoService: ProductoService) {}
  @Post()
  create(@Body() categoria: CreateCategoriaDto) {
    console.log(categoria);
    return this.ProductoService.create(categoria);
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Se han obtenido todos los tipos de cuenta exitosamente.',
  })
  findAll() {
    return this.ProductoService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductoService.findOne(1);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateProductoDto: UpdateProductoDto,
  ) {
    return this.ProductoService.update(+id, UpdateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductoService.remove(+id);
  }
}
