import { AdministrativeUnit } from "src/rrhh/administrative_unit/entities/administrative_unit.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "informatic" })
export class PhysicalLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: 9,
    default: () => "\"informatic\".code_generator('physical_location')",
  })
  code: string;

  @ManyToOne((type) => AdministrativeUnit)
  @JoinTable()
  @JoinColumn({
    name: "administrative_unit_code",
    referencedColumnName: "code",
  })
  administrative_unit_code: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
