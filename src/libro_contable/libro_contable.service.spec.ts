import { Test, TestingModule } from '@nestjs/testing';
import { LibroContableService } from './libro_contable.service';

describe('LibroContableService', () => {
  let service: LibroContableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibroContableService],
    }).compile();

    service = module.get<LibroContableService>(LibroContableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
