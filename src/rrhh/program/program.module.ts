import { Module } from "@nestjs/common";
import { ProgramService } from "./program.service";
import { ProgramController } from "./program.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Program } from "./entities/program.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([Program]), AuthModule],
  controllers: [ProgramController],
  providers: [ProgramService, RedisService],
})
export class ProgramModule {}
