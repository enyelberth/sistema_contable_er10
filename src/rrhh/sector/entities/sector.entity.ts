import { Activity } from "src/rrhh/activity/entities/activity.entity";
import { AdministrativeUnit } from "src/rrhh/administrative_unit/entities/administrative_unit.entity";
import { Program } from "src/rrhh/program/entities/program.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "rrhh" })
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: 2,
  })
  code: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: () => "current_timestamp" })
  created_at: Date;

  @Column({ default: () => "current_timestamp" })
  update_at: Date;

  @OneToMany(() => Program, (program) => program.sector)
  program: Program[];

  @OneToMany(() => Activity, (activity) => activity.sector)
  activity: Activity[];

  @OneToMany(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.sector,
  )
  administrativeUnit: AdministrativeUnit;
}
