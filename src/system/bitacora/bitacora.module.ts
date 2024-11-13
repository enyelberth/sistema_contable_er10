import { Module } from "@nestjs/common";
import { BitacoraController } from "./bitacora.controller";
import { BitacoraService } from "./bitacora.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bitacora } from "./entities/bitacora.entity";
import { RedisService } from "src/redis/redis.service";

@Module({
  imports: [TypeOrmModule.forFeature([Bitacora]), AuthModule],
  controllers: [BitacoraController],
  providers: [BitacoraService, RedisService],
  exports: [BitacoraService],
})
export class BitacoraModule {}
