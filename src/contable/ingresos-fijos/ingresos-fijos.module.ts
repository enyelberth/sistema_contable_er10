import { Module } from '@nestjs/common';
import { IngresosFijosService } from './ingresos-fijos.service';
import { IngresosFijosController } from './ingresos-fijos.controller';

@Module({
  controllers: [IngresosFijosController],
  providers: [IngresosFijosService],
})
export class IngresosFijosModule {}
