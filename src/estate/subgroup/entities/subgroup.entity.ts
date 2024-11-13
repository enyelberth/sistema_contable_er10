import { Section } from "src/estate/section/entities/section.entity";
import { Group } from "../../group/entities/group.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventory } from "src/estate/inventory/entities/inventory.entity";

@Entity({ schema: "estate" })
@Index(["code", "group_code"], { unique: true })
export class SubGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 2,
  })
  code: string;

  @Column({ nullable: false, type: "varchar", length: 150 })
  name: string;

  @Column({ name: "group_code", type: "varchar", length: 2 })
  group_code: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: () => "current_timestamp" })
  created_at: Date;

  @Column({ default: () => "current_timestamp" })
  update_at: Date;

  @ManyToOne((type) => Group, (group) => group.subGroup)
  @JoinColumn({ name: "group_code", referencedColumnName: "code" })
  group: Group[];

  @OneToMany(() => Section, (section) => section.subGroup)
  section: Section[];

  @OneToMany(() => Inventory, (inventory) => inventory.subGroup)
  inventory: Inventory[];
}
