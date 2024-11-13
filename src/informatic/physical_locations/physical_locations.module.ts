import { Module } from '@nestjs/common';
import { PhysicalLocationsService } from './physical_locations.service';
import { PhysicalLocationsController } from './physical_locations.controller';

@Module({
  controllers: [PhysicalLocationsController],
  providers: [PhysicalLocationsService],
})
export class PhysicalLocationsModule {}
