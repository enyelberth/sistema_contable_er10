import { Injectable } from '@nestjs/common';
import { CreateGastoFijoDto } from './dto/create-gasto-fijo.dto';
import { UpdateGastoFijoDto } from './dto/update-gasto-fijo.dto';

@Injectable()
export class GastoFijosService {
  create(createGastoFijoDto: CreateGastoFijoDto) {
    return 'This action adds a new gastoFijo';
  }

  findAll() {
    return `This action returns all gastoFijos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gastoFijo`;
  }

  update(id: number, updateGastoFijoDto: UpdateGastoFijoDto) {
    return `This action updates a #${id} gastoFijo`;
  }

  remove(id: number) {
    return `This action removes a #${id} gastoFijo`;
  }
}
