import { Module } from "@nestjs/common";
import { PersonalDataService } from "./personal-data.service";
import { PersonalDataController } from "./personal-data.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonalDatum } from "./entities/personal-datum.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDatum]), AuthModule],
  controllers: [PersonalDataController],
  providers: [PersonalDataService, RedisService],
  exports: [PersonalDataService],
})
export class PersonalDataModule {}
