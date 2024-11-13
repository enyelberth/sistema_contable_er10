import { Module } from '@nestjs/common';
import { PhysicalLocationEmployedsService } from './physical_location_employeds.service';
import { PhysicalLocationEmployedsController } from './physical_location_employeds.controller';

@Module({
  controllers: [PhysicalLocationEmployedsController],
  providers: [PhysicalLocationEmployedsService],
})
export class PhysicalLocationEmployedsModule {}
