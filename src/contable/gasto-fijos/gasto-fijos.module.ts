import { Module } from '@nestjs/common';
import { GastoFijosService } from './gasto-fijos.service';
import { GastoFijosController } from './gasto-fijos.controller';

@Module({
  controllers: [GastoFijosController],
  providers: [GastoFijosService],
})
export class GastoFijosModule {}
