import { Injectable } from "@nestjs/common";
import { CreateMovementDto } from "./dto/create-movement.dto";
import { UpdateMovementDto } from "./dto/update-movement.dto";

@Injectable()
export class MovementService {
  create(createMovementDto: CreateMovementDto) {
    return "This action adds a new movableProperty";
  }

  findAll() {
    return `This action returns all movableProperty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movableProperty`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movableProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} movableProperty`;
  }
}
