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
import { User } from "src/system/user/entities/user.entity";

@Entity({ schema: "system" })
export class Bitacora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 50 })
  origin: string;

  @Column({ nullable: false, type: "varchar", length: 50 })
  service: string;

  @ManyToOne((type) => User)
  @JoinTable()
  @JoinColumn([{ name: "user_code", referencedColumnName: "code" }])
  @Column({ nullable: true, type: "varchar", length: 9 })
  user_code: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;
}
