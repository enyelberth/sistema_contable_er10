import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalLocationsController } from './physical_locations.controller';
import { PhysicalLocationsService } from './physical_locations.service';

describe('PhysicalLocationsController', () => {
  let controller: PhysicalLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalLocationsController],
      providers: [PhysicalLocationsService],
    }).compile();

    controller = module.get<PhysicalLocationsController>(PhysicalLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
