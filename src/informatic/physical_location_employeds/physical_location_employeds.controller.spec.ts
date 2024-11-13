import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalLocationEmployedsController } from './physical_location_employeds.controller';
import { PhysicalLocationEmployedsService } from './physical_location_employeds.service';

describe('PhysicalLocationEmployedsController', () => {
  let controller: PhysicalLocationEmployedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalLocationEmployedsController],
      providers: [PhysicalLocationEmployedsService],
    }).compile();

    controller = module.get<PhysicalLocationEmployedsController>(PhysicalLocationEmployedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
