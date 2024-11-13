import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalLocationEmployedDto } from './create-physical_location_employed.dto';

export class UpdatePhysicalLocationEmployedDto extends PartialType(CreatePhysicalLocationEmployedDto) {}
