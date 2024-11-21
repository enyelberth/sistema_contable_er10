import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { HashService } from "../../hash/hash.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RolesModule } from "../roles/roles.module";
import { StatusModule } from "../status/status.module";
import { Role } from "../roles/entities/role.entity";
import { AccessLevel } from "../access-level/entities/access-level.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, AccessLevel]),
    RolesModule,
    
    StatusModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
