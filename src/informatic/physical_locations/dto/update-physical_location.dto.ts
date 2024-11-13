import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalLocationDto } from './create-physical_location.dto';

export class UpdatePhysicalLocationDto extends PartialType(CreatePhysicalLocationDto) {}
