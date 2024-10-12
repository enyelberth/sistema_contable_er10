import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngresosFijosService } from './ingresos-fijos.service';
import { CreateIngresosFijoDto } from './dto/create-ingresos-fijo.dto';
import { UpdateIngresosFijoDto } from './dto/update-ingresos-fijo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('IngresosFijos')
@Controller('ingresos-fijos')
export class IngresosFijosController {
  constructor(private readonly ingresosFijosService: IngresosFijosService) {}

  @Post()
  create(@Body() createIngresosFijoDto: CreateIngresosFijoDto) {
    return this.ingresosFijosService.create(createIngresosFijoDto);
  }

  @Get()
  findAll() {
    return this.ingresosFijosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingresosFijosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngresosFijoDto: UpdateIngresosFijoDto,
  ) {
    return this.ingresosFijosService.update(+id, updateIngresosFijoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosFijosService.remove(+id);
  }
}
