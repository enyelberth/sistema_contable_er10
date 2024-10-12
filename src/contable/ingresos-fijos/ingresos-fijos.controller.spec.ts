import { Test, TestingModule } from '@nestjs/testing';
import { IngresosFijosController } from './ingresos-fijos.controller';
import { IngresosFijosService } from './ingresos-fijos.service';

describe('IngresosFijosController', () => {
  let controller: IngresosFijosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresosFijosController],
      providers: [IngresosFijosService],
    }).compile();

    controller = module.get<IngresosFijosController>(IngresosFijosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
