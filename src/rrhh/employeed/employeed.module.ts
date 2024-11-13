import { Module } from "@nestjs/common";
import { EmployeedService } from "./employeed.service";
import { EmployeedController } from "./employeed.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employeed } from "./entities/employeed.entity";
import { PersonalDataModule } from "../personal-data/personal-data.module";
import { JobPositionModule } from "../job-position/job-position.module";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Employeed]),
    PersonalDataModule,
    JobPositionModule,
    AuthModule,
  ],
  controllers: [EmployeedController],
  providers: [EmployeedService, RedisService],
  exports: [EmployeedService],
})
export class EmployeedModule {}
