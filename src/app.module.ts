import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LibroContableModule } from './libro_contable/libro_contable.module';
// import { CategoriaContableModule } from './categoria_contable/categoria_contable.module';
import { UsersModule } from './system/users/users.module';
import { IngresosModule } from './contable/ingresos/ingresos.module';
import { IngresosFijosModule } from './contable/ingresos-fijos/ingresos-fijos.module';
import { GastoFijosModule } from './contable/gasto-fijos/gasto-fijos.module';
import { GastoModule } from './contable/gasto/gasto.module';
import { CategoriaModule } from './contable/categoria/categoria.module';

@Module({
  imports: [UsersModule,  IngresosModule, IngresosFijosModule, GastoFijosModule, GastoModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
