import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaContableController } from './categoria_contable.controller';
import { CategoriaContableService } from './categoria_contable.service';

describe('CategoriaContableController', () => {
  let controller: CategoriaContableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaContableController],
      providers: [CategoriaContableService],
    }).compile();

    controller = module.get<CategoriaContableController>(CategoriaContableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
