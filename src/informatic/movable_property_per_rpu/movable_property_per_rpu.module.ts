import { Module } from '@nestjs/common';
import { MovablePropertyPerRpuService } from './movable_property_per_rpu.service';
import { MovablePropertyPerRpuController } from './movable_property_per_rpu.controller';

@Module({
  controllers: [MovablePropertyPerRpuController],
  providers: [MovablePropertyPerRpuService],
})
export class MovablePropertyPerRpuModule {}
