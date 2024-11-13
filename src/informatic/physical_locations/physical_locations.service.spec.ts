import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalLocationsService } from './physical_locations.service';

describe('PhysicalLocationsService', () => {
  let service: PhysicalLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalLocationsService],
    }).compile();

    service = module.get<PhysicalLocationsService>(PhysicalLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
