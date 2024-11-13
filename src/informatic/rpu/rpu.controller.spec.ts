import { Test, TestingModule } from '@nestjs/testing';
import { RpuController } from './rpu.controller';
import { RpuService } from './rpu.service';

describe('RpuController', () => {
  let controller: RpuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpuController],
      providers: [RpuService],
    }).compile();

    controller = module.get<RpuController>(RpuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
