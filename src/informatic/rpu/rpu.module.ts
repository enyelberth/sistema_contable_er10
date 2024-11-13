import { Module } from '@nestjs/common';
import { RpuService } from './rpu.service';
import { RpuController } from './rpu.controller';

@Module({
  controllers: [RpuController],
  providers: [RpuService],
})
export class RpuModule {}
