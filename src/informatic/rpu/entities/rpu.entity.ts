import { Employeed } from "src/rrhh/employeed/entities/employeed.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "informatic" })
export class Rpu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true,
    length: 11,
    default: () => "\"informatic\".code_generator('rpu')",
  })
  code: string;

  @OneToOne((type) => Employeed)
  @JoinTable()
  @JoinColumn({ name: "employeed_code", referencedColumnName: "code" })
  employeed_code: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
