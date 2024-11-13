import { Test, TestingModule } from '@nestjs/testing';
import { MovablePropertyPerRpuService } from './movable_property_per_rpu.service';

describe('MovablePropertyPerRpuService', () => {
  let service: MovablePropertyPerRpuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovablePropertyPerRpuService],
    }).compile();

    service = module.get<MovablePropertyPerRpuService>(MovablePropertyPerRpuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
