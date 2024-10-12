import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibroContableModule } from './libro_contable/libro_contable.module';
import { CategoriaContableModule } from './categoria_contable/categoria_contable.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CategoriaContableModule, LibroContableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
