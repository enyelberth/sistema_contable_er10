import { PartialType } from '@nestjs/swagger';
import { CreateMovablePropertyPerRpuDto } from './create-movable_property_per_rpu.dto';

export class UpdateMovablePropertyPerRpuDto extends PartialType(CreateMovablePropertyPerRpuDto) {}
