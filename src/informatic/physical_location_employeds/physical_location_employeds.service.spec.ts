import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalLocationEmployedsService } from './physical_location_employeds.service';

describe('PhysicalLocationEmployedsService', () => {
  let service: PhysicalLocationEmployedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalLocationEmployedsService],
    }).compile();

    service = module.get<PhysicalLocationEmployedsService>(PhysicalLocationEmployedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
