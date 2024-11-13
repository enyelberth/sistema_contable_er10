import { PartialType } from '@nestjs/swagger';
import { CreateRpuDto } from './create-rpu.dto';

export class UpdateRpuDto extends PartialType(CreateRpuDto) {}
