import { Module } from '@nestjs/common';
import { LibroContableService } from './libro_contable.service';
import { LibroContableController } from './libro_contable.controller';

@Module({
  controllers: [LibroContableController],
  providers: [LibroContableService],
})
export class LibroContableModule {}
