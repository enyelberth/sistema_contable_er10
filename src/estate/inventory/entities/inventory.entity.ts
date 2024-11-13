import { Group } from "./../../group/entities/group.entity";
import { SubGroup } from "./../../subgroup/entities/subgroup.entity";
import { Section } from "./../../section/entities/section.entity";
import {
  Column,
  ManyToOne,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { MovementDetails } from "src/estate/movement_details/entities/movement_details.entity";

@Entity({ schema: "estate" })
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  identify_number: string;

  @Column({
    nullable: true,
    unique: true,
    type: "varchar",
    default: () => "\"estate\".code_generator('inventory')",
    length: 9,
  })
  code: string;

  @Column({ name: "group_code" })
  group_code: string;

  @Column({ name: "sub_group_code" })
  sub_group_code: string;

  @Column({ name: "section_code" })
  section_code: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "float", nullable: false })
  amount: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne(() => Group, (group) => group.inventory)
  @JoinColumn([{ name: "group_code", referencedColumnName: "code" }])
  group: Group;

  @ManyToOne(() => SubGroup, (subgroup) => subgroup.inventory)
  @JoinColumn([
    { name: "group_code", referencedColumnName: "group_code" },
    { name: "sub_group_code", referencedColumnName: "code" },
  ])
  subGroup: SubGroup;

  @ManyToOne(() => Section, (section) => section.inventory)
  @JoinColumn([
    { name: "group_code", referencedColumnName: "group_code" },
    { name: "sub_group_code", referencedColumnName: "sub_group_code" },
    { name: "section_code", referencedColumnName: "code" },
  ])
  section: Section;

  @OneToMany(
    () => MovementDetails,
    (movementDetails) => movementDetails.inventory,
  )
  movementDetails: MovementDetails;
}
