import { Module } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { ActivityController } from "./activity.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), AuthModule],
  controllers: [ActivityController],
  providers: [ActivityService, RedisService],
})
export class ActivityModule {}
