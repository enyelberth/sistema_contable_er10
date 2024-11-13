import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "system" })
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    type: "varchar",
    length: 9,
    default: () => "\"system\".code_generator('module')",
  })
  code: string;

  @ManyToOne((type) => Modules)
  // @JoinColumn([{ name: "pathern_code", referencedColumnName: "code" }])
  @JoinTable()
  @Column({ nullable: true, type: "varchar", length: 9 })
  pathern_code: string;

  @Column({ nullable: false, type: "smallint" })
  place: number;

  @Column({ nullable: false, type: "smallint" })
  tree_level: number;

  @Column({ nullable: false, unique: true, type: "varchar", length: 150 })
  name_module!: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  src!: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  icon!: string;

  @Column({ default: true, type: "boolean" })
  active!: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
