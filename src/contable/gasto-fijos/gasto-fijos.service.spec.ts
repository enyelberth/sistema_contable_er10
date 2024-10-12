import { Test, TestingModule } from '@nestjs/testing';
import { GastoFijosService } from './gasto-fijos.service';

describe('GastoFijosService', () => {
  let service: GastoFijosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastoFijosService],
    }).compile();

    service = module.get<GastoFijosService>(GastoFijosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
