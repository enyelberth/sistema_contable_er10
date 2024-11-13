import { MotionConcept } from "../../motion_concept/entities/motion_concept.entity";
import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AdministrativeUnit } from "../../../rrhh/administrative_unit/entities/administrative_unit.entity";
import { MovementDetails } from "src/estate/movement_details/entities/movement_details.entity";
import { Responsable } from "src/estate/responsable/entities/responsable.entity";

@Entity({ schema: "estate" })
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 9,
    unique: true,
    default: () => "\"estate\".code_generator('movement')",
  })
  code: string;

  @Column({
    type: "boolean",
    default: null,
  })
  responsible_sign: boolean;

  @Column({
    type: "boolean",
    default: null,
  })
  director_sign: boolean;

  @Column({
    type: "boolean",
    default: null,
  })
  estate_sign: boolean;

  @Column({
    type: "boolean",
    default: null,
  })
  processed: boolean;

  @Column({ type: "text", nullable: false })
  observation: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne((type) => MotionConcept, (motionConcept) => motionConcept.movement)
  @JoinColumn({ name: "motion_concept_code", referencedColumnName: "code" })
  motionConcept: MotionConcept[];

  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnitSchema) => administrativeUnitSchema.movement,
  )
  @JoinColumn({
    name: "administrative_unit_code",
    referencedColumnName: "code",
  })
  administrative_unit_code: AdministrativeUnit[];

  @OneToMany(
    () => MovementDetails,
    (movementDetails) => movementDetails.movement,
  )
  movementDetails: MovementDetails;

  @OneToMany(() => Responsable, (responsable) => responsable.movement)
  responsable: Responsable;
}
