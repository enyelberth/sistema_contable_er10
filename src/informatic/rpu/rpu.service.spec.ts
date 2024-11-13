import { Test, TestingModule } from '@nestjs/testing';
import { RpuService } from './rpu.service';

describe('RpuService', () => {
  let service: RpuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpuService],
    }).compile();

    service = module.get<RpuService>(RpuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
