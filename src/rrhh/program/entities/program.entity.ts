import { Activity } from "src/rrhh/activity/entities/activity.entity";
import { Sector } from "../../sector/entities/sector.entity";
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
@Index(["code", "sector_code"], { unique: true })
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 2,
  })
  code: string;

  @Column({ nullable: false, type: "varchar", length: 2 })
  sector_code: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
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

  @OneToMany(() => Activity, (activity) => activity.sector)
  activity: Activity[];

  @OneToMany(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.sector,
  )
  administrativeUnit: AdministrativeUnit;
}
