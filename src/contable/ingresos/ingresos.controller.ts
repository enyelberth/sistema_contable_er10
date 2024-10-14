import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ingresos')
@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  @Post()
  create(@Body() ingreso: CreateIngresoDto) {
    return this.ingresosService.create(ingreso);
  }

  @Get()
  findAll() {
    return this.ingresosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingresosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ingreso: CreateIngresoDto) {
    return this.ingresosService.update(+id, ingreso);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosService.remove(+id);
  }
}
