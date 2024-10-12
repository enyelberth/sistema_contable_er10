import { Injectable } from '@nestjs/common';
import { CreateIngresosFijoDto } from './dto/create-ingresos-fijo.dto';
import { UpdateIngresosFijoDto } from './dto/update-ingresos-fijo.dto';

@Injectable()
export class IngresosFijosService {
  create(createIngresosFijoDto: CreateIngresosFijoDto) {
    return 'This action adds a new ingresosFijo';
  }

  findAll() {
    return `This action returns all ingresosFijos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingresosFijo`;
  }

  update(id: number, updateIngresosFijoDto: UpdateIngresosFijoDto) {
    return `This action updates a #${id} ingresosFijo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingresosFijo`;
  }
}
