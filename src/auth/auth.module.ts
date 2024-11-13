import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./const/constants";
import { HashService } from "../hash/hash.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../system/user/entities/user.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TokenBlacklistService } from "./jwt/blacklist/token.blacklist.service";
import { AuthJwtService } from "./jwt/jwt.service";
import { BlacklistCleanupService } from "./jwt/blacklist/cleanup.blacklist.service";
import { ScheduleTaskService } from "./task/schedule.task.service";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    JwtStrategy,
    TokenBlacklistService,
    AuthJwtService,
    BlacklistCleanupService,
    ScheduleTaskService,
    RedisService,
  ],
  exports: [
    AuthService,
    HashService,
    JwtStrategy,
    TokenBlacklistService,
    AuthJwtService,
    BlacklistCleanupService,
    ScheduleTaskService,
  ],
})
export class AuthModule {}
