import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { AuthModule } from "../../auth/auth.module";
import { RedisService } from "src/redis/redis.service";
import { AccessLevelModule } from "src/system/access-level/access-level.module";
import { AccessLevel } from "src/system/access-level/entities/access-level.entity";
import { AccessLevelService } from "src/system/access-level/access-level.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Group, AccessLevel]),
        AuthModule,
        AccessLevelModule,
    ],
    controllers:[GroupController],
    providers:[GroupService,RedisService,AccessLevelService],
})
export class GroupModule{}