import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GastoFijosService } from './gasto-fijos.service';
import { CreateGastoFijoDto } from './dto/create-gasto-fijo.dto';
import { UpdateGastoFijoDto } from './dto/update-gasto-fijo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GastosFijos')
@Controller('gasto-fijos')
export class GastoFijosController {
  constructor(private readonly gastoFijosService: GastoFijosService) {}

  @Post()
  create(@Body() createGastoFijoDto: CreateGastoFijoDto) {
    return this.gastoFijosService.create(createGastoFijoDto);
  }

  @Get()
  findAll() {
    return this.gastoFijosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastoFijosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGastoFijoDto: UpdateGastoFijoDto,
  ) {
    return this.gastoFijosService.update(+id, updateGastoFijoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastoFijosService.remove(+id);
  }
}
