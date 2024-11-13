import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { AccessLevel } from "../access-level/entities/access-level.entity";
import { AuthModule } from "../../auth/auth.module";
import { AccessLevelModule } from "../access-level/access-level.module";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, AccessLevel]),
    AuthModule,
    AccessLevelModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, RedisService],
  exports: [RolesService],
})
export class RolesModule {}
