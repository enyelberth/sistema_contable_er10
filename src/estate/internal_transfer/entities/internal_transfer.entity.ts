import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AdministrativeUnit } from "../../../rrhh/administrative_unit/entities/administrative_unit.entity";
import { Employeed } from "../../../rrhh/employeed/entities/employeed.entity";

@Entity({ schema: "estate" })
export class InternalTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdministrativeUnit)
  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  administrative_unit_divestiture_code: string;

  @ManyToOne(() => AdministrativeUnit)
  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  administrative_unit_incorporate_code: string;

  @ManyToOne(() => Employeed)
  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
  })
  responsible_code: string;

  @Column({ type: "text", nullable: false })
  observation: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
