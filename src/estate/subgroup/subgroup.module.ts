import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { AccessLevelModule } from "src/system/access-level/access-level.module";
import { SubGroup } from "./entities/subgroup.entity";
import { AccessLevel } from "src/system/access-level/entities/access-level.entity";
import { SubGroupController } from "./subgroup.controller";
import { SubGroupService } from "./subgroup.service";
import { AccessLevelService } from "src/system/access-level/access-level.service";
import { RedisService } from "src/redis/redis.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([SubGroup,AccessLevel]),
        AuthModule,
        AccessLevelModule,
    ],
    controllers:[SubGroupController],
    providers:[SubGroupService,RedisService,AccessLevelService],
})

export class SubGroupModule{}