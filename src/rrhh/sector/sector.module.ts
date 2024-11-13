import { Module } from "@nestjs/common";
import { SectorService } from "./sector.service";
import { SectorController } from "./sector.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sector } from "./entities/sector.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sector]), AuthModule],
  controllers: [SectorController],
  providers: [SectorService, RedisService],
})
export class SectorModule {}
