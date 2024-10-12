import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaContableService } from './categoria_contable.service';

describe('CategoriaContableService', () => {
  let service: CategoriaContableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaContableService],
    }).compile();

    service = module.get<CategoriaContableService>(CategoriaContableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
