import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "system" })
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 9,
    default: () => "\"system\".code_generator('status')",
  })
  code: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
