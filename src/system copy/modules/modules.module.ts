import { Module } from "@nestjs/common";
import { ModulesService } from "./modules.service";
import { ModulesController } from "./modules.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Modules } from "./entities/module.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";
import { AccessLevelService } from "../access-level/access-level.service";
import { AccessLevelModule } from "../access-level/access-level.module";
import { AccessLevel } from "../access-level/entities/access-level.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([Modules, AccessLevel]),
    AuthModule,
    AccessLevelModule,
  ],
  // imports: [
  //   TypeOrmModule.forFeature([Modules])
  // ],
  controllers: [ModulesController],
  providers: [ModulesService, RedisService, AccessLevelService],
})
export class ModulesModule {}
