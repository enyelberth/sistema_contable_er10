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
import { PersonalDatum } from "../../personal-data/entities/personal-datum.entity";
import { JobPosition } from "../../job-position/entities/job-position.entity";
import { AdministrativeUnit } from "../../administrative_unit/entities/administrative_unit.entity";
import { Responsable } from "src/estate/responsable/entities/responsable.entity";

@Entity({ schema: "rrhh" })
@Index(["personal_data_code", "job_position_code"], { unique: true })
export class Employeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: 9,
    default: () => "\"rrhh\".code_generator('employed')",
  })
  code: string;

  @ManyToOne((type) => PersonalDatum)
  @JoinTable()
  @JoinColumn([{ name: "personal_data_code", referencedColumnName: "code" }])
  personal_data_code: PersonalDatum;

  @ManyToOne((type) => JobPosition)
  @JoinTable()
  @JoinColumn([{ name: "job_position_code", referencedColumnName: "code" }])
  job_position_code: JobPosition;

  @ManyToOne((type) => AdministrativeUnit)
  @JoinTable()
  @JoinColumn([
    { name: "administrative_unit_code", referencedColumnName: "code" },
  ])
  administrative_unit_code: AdministrativeUnit;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @OneToMany(() => Responsable, (responsable) => responsable.director)
  director: Responsable;

  @OneToMany(() => Responsable, (responsable) => responsable.responsible)
  responsible: Responsable;
}
