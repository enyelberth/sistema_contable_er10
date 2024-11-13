import { Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Section } from "./entities/section.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";
import { AccessLevelModule } from "src/system/access-level/access-level.module";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { AccessLevel } from "src/system/access-level/entities/access-level.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, AccessLevel]),
    AuthModule,
    AccessLevelModule,
  ],
  // imports: [
  //   TypeOrmModule.forFeature([Modules])
  // ],
  controllers: [SectionController],
  providers: [SectionService, RedisService, AccessLevelService],
})
export class SectionModule {}
