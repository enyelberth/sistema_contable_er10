import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "rrhh" })
export class PersonalDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    type: "varchar",
    length: 9,
    default: () => "\"rrhh\".code_generator('datum')",
  })
  code: string;

  @Column({ nullable: false, type: "varchar", length: 50 })
  first_name: string;

  @Column({ nullable: false, type: "varchar", length: 50 })
  last_name: string;

  @Column({ nullable: false, type: "varchar", length: 1 })
  identify_acronym: string;

  @Column({ unique: true, nullable: false, type: "varchar", length: 12 })
  identify_number: string;

  @Column({ nullable: false, type: "date" })
  birth_date: Date;

  @Column({ nullable: false, type: "varchar", length: 9 })
  gender: string;

  @Column({ nullable: false, type: "varchar", length: 16 })
  phone_number: string;

  @Column({ nullable: true, type: "text" })
  home_address: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
