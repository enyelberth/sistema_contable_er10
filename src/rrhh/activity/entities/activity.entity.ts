import { Sector } from "src/rrhh/sector/entities/sector.entity";
import { Program } from "../../program/entities/program.entity";
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
import { AdministrativeUnit } from "src/rrhh/administrative_unit/entities/administrative_unit.entity";

@Entity({ schema: "rrhh" })
@Index(["code", "program_code", "sector_code"], { unique: true })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 2,
  })
  code: string;

  @Column({ name: "program_code", type: "varchar", length: 2 })
  program_code: string;

  @Column({ name: "sector_code", type: "varchar", length: 2 })
  sector_code: string;

  @Column({ nullable: false, unique: true, type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: () => "current_timestamp" })
  created_at: Date;

  @Column({ default: () => "current_timestamp" })
  update_at: Date;

  @ManyToOne((type) => Sector, (sector) => sector.program)
  @JoinColumn([{ name: "sector_code", referencedColumnName: "code" }])
  sector: Sector;

  @ManyToOne((type) => Program, (program) => program.activity)
  @JoinColumn([
    { name: "program_code", referencedColumnName: "code" },
    { name: "sector_code", referencedColumnName: "sector_code" },
  ])
  program: Program;

  @OneToMany(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.sector,
  )
  administrativeUnit: AdministrativeUnit;
}
