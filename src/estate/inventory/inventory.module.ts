import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";
import { AccessLevelModule } from "src/system/access-level/access-level.module";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { AccessLevel } from "src/system/access-level/entities/access-level.entity";
import { Inventory } from "./entities/inventory.entity";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, AccessLevel]),
    AuthModule,
    AccessLevelModule,
  ],
  // imports: [
  //   TypeOrmModule.forFeature([Modules])
  // ],
  controllers: [InventoryController],
  providers: [InventoryService, RedisService, AccessLevelService],
})
export class ModulesModule {}
