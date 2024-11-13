import { Test, TestingModule } from '@nestjs/testing';
import { MovablePropertyPerRpuController } from './movable_property_per_rpu.controller';
import { MovablePropertyPerRpuService } from './movable_property_per_rpu.service';

describe('MovablePropertyPerRpuController', () => {
  let controller: MovablePropertyPerRpuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovablePropertyPerRpuController],
      providers: [MovablePropertyPerRpuService],
    }).compile();

    controller = module.get<MovablePropertyPerRpuController>(MovablePropertyPerRpuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
