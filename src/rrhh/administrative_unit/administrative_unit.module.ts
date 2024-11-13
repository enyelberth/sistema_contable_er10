import { Module } from "@nestjs/common";
import { AdministrativeUnitService } from "./administrative_unit.service";
import { AdministrativeUnitController } from "./administrative_unit.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdministrativeUnit } from "./entities/administrative_unit.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([AdministrativeUnit]), AuthModule],
  controllers: [AdministrativeUnitController],
  providers: [AdministrativeUnitService, RedisService],
})
export class AdministrativeUnitModule {}
