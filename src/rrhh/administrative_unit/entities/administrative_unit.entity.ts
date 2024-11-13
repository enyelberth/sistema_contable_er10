import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sector } from "../../sector/entities/sector.entity";
import { Program } from "../../program/entities/program.entity";
import { Activity } from "../../activity/entities/activity.entity";
import { Movement } from "src/estate/movement/entities/movement.entity";

@Entity({ schema: "rrhh" })
@Index(["sector_code", "program_code", "activity_code"], { unique: true })
export class AdministrativeUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: 6,
  })
  code: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    nullable: true,
    type: "text",
  })
  description: string;

  @Column({ name: "sector_code", type: "varchar", length: 2 })
  sector_code: string;

  @Column({ name: "program_code", type: "varchar", length: 2 })
  program_code: string;

  @Column({ name: "activity_code", type: "varchar", length: 2 })
  activity_code: string;

  @Column({ default: () => "current_timestamp" })
  created_at: Date;

  @Column({ default: () => "current_timestamp" })
  update_at: Date;

  @OneToMany(() => Movement, (movement) => movement.administrative_unit_code)
  movement: Movement;

  @ManyToOne((type) => Sector, (sector) => sector.administrativeUnit)
  @JoinColumn([{ name: "sector_code", referencedColumnName: "code" }])
  sector: Sector;

  @ManyToOne((type) => Program, (program) => program.administrativeUnit)
  @JoinColumn([
    { name: "program_code", referencedColumnName: "code" },
    { name: "sector_code", referencedColumnName: "sector_code" },
  ])
  program: Program;

  @ManyToOne((type) => Activity, (activity) => activity.administrativeUnit)
  @JoinColumn([
    { name: "activity_code", referencedColumnName: "code" },
    { name: "sector_code", referencedColumnName: "sector_code" },
    { name: "program_code", referencedColumnName: "program_code" },
  ])
  activity: Activity;
}
