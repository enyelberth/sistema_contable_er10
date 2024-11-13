import { Movement } from "src/estate/movement/entities/movement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "estate" })
export class MotionConcept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 2, unique: true })
  code: number;

  @Column({ nullable: false, type: "varchar", length: 1 })
  type: string;

  @Column({ nullable: true, type: "varchar" })
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @OneToMany(() => Movement, (movement) => movement.motionConcept)
  movement: Movement;
}
