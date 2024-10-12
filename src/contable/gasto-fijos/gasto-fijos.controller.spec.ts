import { Test, TestingModule } from '@nestjs/testing';
import { GastoFijosController } from './gasto-fijos.controller';
import { GastoFijosService } from './gasto-fijos.service';

describe('GastoFijosController', () => {
  let controller: GastoFijosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastoFijosController],
      providers: [GastoFijosService],
    }).compile();

    controller = module.get<GastoFijosController>(GastoFijosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
