import { Module } from "@nestjs/common";
import { AccessLevelService } from "./access-level.service";
import { AccessLevelController } from "./access-level.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessLevel } from "./entities/access-level.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([AccessLevel]), AuthModule],
  controllers: [AccessLevelController],
  providers: [AccessLevelService, ],
  exports: [AccessLevelService],
})
export class AccessLevelModule {}
