import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Movement } from "../../movement/entities/movement.entity";
import { Employeed } from "../../../rrhh/employeed/entities/employeed.entity";

@Entity({ schema: "estate" })
export class Responsable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  movement_code: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  director_code: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  responsible_code: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne(() => Employeed, (employed) => employed.director)
  @JoinColumn({ name: "director_code", referencedColumnName: "code" })
  director: Employeed;

  @ManyToOne(() => Employeed, (employed) => employed.responsible)
  @JoinColumn({ name: "responsible_code", referencedColumnName: "code" })
  responsible: Employeed;

  @ManyToOne(() => Movement, (movement) => movement.responsable)
  @JoinColumn([{ name: "movement_code", referencedColumnName: "code" }])
  movement: Movement;
}
