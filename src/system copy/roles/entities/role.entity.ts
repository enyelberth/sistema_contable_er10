import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "system" })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    type: "varchar",
    length: 9,
    default: () => "\"system\".code_generator('role')",
  })
  code: string;

  @Column({ unique: true, nullable: false, type: "varchar", length: 50 })
  name_role: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
