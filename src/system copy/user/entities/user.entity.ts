import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "@nestjs/class-validator";
import { Employeed } from "../../../rrhh/employeed/entities/employeed.entity";
import { Role } from "../../roles/entities/role.entity";
import { Status } from "../../status/entities/status.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "system" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: "varchar",
    length: 9,
    default: () => "\"system\".code_generator('user')",
  })
  code: string;

  @ManyToOne((type) => Role)
  @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
  role_code: Role;

  @ManyToOne((type) => Employeed)
  @JoinColumn([{ name: "employee_code", referencedColumnName: "code" }])
  employee_code: Employeed;

  @ManyToOne((type) => Status)
  @JoinColumn([{ name: "status_code", referencedColumnName: "code" }])
  status_code: Status;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/((?=.*\d) | (?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "la contraseña debe tener minimo 8 caracteres",
  })
  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
