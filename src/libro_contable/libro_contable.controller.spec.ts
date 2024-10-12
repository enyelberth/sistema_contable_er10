import { Test, TestingModule } from '@nestjs/testing';
import { LibroContableController } from './libro_contable.controller';
import { LibroContableService } from './libro_contable.service';

describe('LibroContableController', () => {
  let controller: LibroContableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroContableController],
      providers: [LibroContableService],
    }).compile();

    controller = module.get<LibroContableController>(LibroContableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
