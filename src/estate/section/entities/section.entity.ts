import { Group } from "../../group/entities/group.entity";
import { SubGroup } from "../../subgroup/entities/subgroup.entity";
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
@Index(["code", "sub_group_code", "group_code"], { unique: true })
export class Section {
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

  @Column({ name: "group_code", type: "varchar", length: 2 }) // Define group_code column
  group_code: string;

  @Column({ name: "sub_group_code", type: "varchar", length: 2 }) // Define group_code column
  sub_group_code: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: () => "current_timestamp" })
  created_at: Date;

  @Column({ default: () => "current_timestamp" })
  update_at: Date;

  @ManyToOne((type) => SubGroup, (subgroup) => subgroup.section)
  @JoinColumn([
    { name: "sub_group_code", referencedColumnName: "code" },
    { name: "group_code", referencedColumnName: "group_code" },
  ])
  subGroup: SubGroup;

  @ManyToOne((type) => Group, (group) => group.section)
  @JoinColumn([{ name: "group_code", referencedColumnName: "code" }])
  group: Group;

  @OneToMany(() => Inventory, (inventory) => inventory.subGroup)
  inventory: Inventory[];
}
