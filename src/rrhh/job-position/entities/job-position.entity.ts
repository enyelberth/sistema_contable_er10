import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "rrhh" })
export class JobPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    type: "varchar",
    length: 9,
    default: () => "\"rrhh\".code_generator('job_position')",
  })
  code: string;

  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  job_name: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
