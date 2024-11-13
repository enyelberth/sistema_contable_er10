import { Section } from "../../../estate/section/entities/section.entity";
import { SubGroup } from "../../../estate/subgroup/entities/subgroup.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "src/estate/inventory/entities/inventory.entity";

@Entity({ schema: "estate" })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: "varchar",
    unique: true,
    length: 2,
  })
  code: string;

  @Column({ nullable: true, type: "varchar" })
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @OneToMany(() => SubGroup, (subGroup) => subGroup.group)
  subGroup: SubGroup;

  @OneToMany(() => Section, (section) => section.group)
  section: Section;

  @OneToMany(() => Inventory, (inventory) => inventory.subGroup)
  inventory: Inventory[];
}
