import { Movement } from "src/estate/movement/entities/movement.entity";
import { Rpu } from "src/informatic/rpu/entities/rpu.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "informatic" })
export class MovablePropertyPerRpu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Rpu)
  @JoinTable()
  @JoinColumn({ name: "rpu_code", referencedColumnName: "code" })
  @Column({ nullable: false })
  rpu_code: string;

  @ManyToOne((type) => Movement)
  @JoinTable()
  @JoinColumn({ name: "movable_code", referencedColumnName: "code" })
  @Column({ nullable: false })
  movable_code: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
