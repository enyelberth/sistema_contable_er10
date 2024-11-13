import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MovementService } from "./movement.service";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Form BM2")
@Controller("Movement")
export class MovementController {
  constructor(private readonly MovementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.MovementService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.MovementService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.MovementService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.MovementService.update(+id, updateMovementDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.MovementService.remove(+id);
  }
}
