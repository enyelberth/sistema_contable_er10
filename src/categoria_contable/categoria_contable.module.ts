import { Module } from '@nestjs/common';
import { CategoriaContableService } from './categoria_contable.service';
import { CategoriaContableController } from './categoria_contable.controller';

@Module({
  controllers: [CategoriaContableController],
  providers: [CategoriaContableService],
})
export class CategoriaContableModule {}
