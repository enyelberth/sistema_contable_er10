import { Module } from "@nestjs/common";
import { JobPositionService } from "./job-position.service";
import { JobPositionController } from "./job-position.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPosition } from "./entities/job-position.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([JobPosition]), AuthModule],
  controllers: [JobPositionController],
  providers: [JobPositionService, RedisService],
  exports: [JobPositionService],
})
export class JobPositionModule {}
