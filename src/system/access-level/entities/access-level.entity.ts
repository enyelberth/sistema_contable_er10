import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Modules } from "../../modules/entities/module.entity";

@Entity({ schema: "system" })
@Index(["module_code", "role_code", "name"], { unique: true })
export class AccessLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role)
  @JoinTable()
  @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
  @Column({ nullable: false, type: "varchar", length: 9 })
  role_code: string;

  @ManyToOne((type) => Modules)
  @JoinTable()
  @JoinColumn([{ name: "module_code", referencedColumnName: "code" }])
  @Column({ nullable: false, type: "varchar", length: 9 })
  module_code: string;

  @Column({ default: true, type: "varchar", length: "50" })
  name: string;

  @Column({ default: false, type: "bool" })
  status: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
