import { Test, TestingModule } from '@nestjs/testing';
import { IngresosFijosService } from './ingresos-fijos.service';

describe('IngresosFijosService', () => {
  let service: IngresosFijosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresosFijosService],
    }).compile();

    service = module.get<IngresosFijosService>(IngresosFijosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
