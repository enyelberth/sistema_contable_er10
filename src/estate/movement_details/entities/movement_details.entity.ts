import { Movement } from "src/estate/movement/entities/movement.entity";
import {
  Column,
  ManyToOne,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Inventory } from "src/estate/inventory/entities/inventory.entity";

@Entity({ schema: "estate" })
export class MovementDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "movement_code",
    nullable: false,
    type: "varchar",
    length: 50,
  })
  movement_code: string;

  @Column({
    name: "inventory_code",
    nullable: false,
    type: "varchar",
    length: 50,
  })
  inventory_code: string;

  @Column({
    name: "description",
    nullable: false,
    type: "text",
  })
  description: string;

  @Column({
    name: "amount",
    nullable: false,
    type: "float",
  })
  amount: number;

  @Column({ type: "boolean", nullable: true, default: null })
  approvate: boolean;

  @Column({
    name: "observation",
    nullable: true,
    type: "text",
  })
  observation: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.movementDetails)
  @JoinColumn([{ name: "inventory_code", referencedColumnName: "code" }])
  inventory: Inventory;

  @ManyToOne(() => Movement, (movement) => movement.movementDetails)
  @JoinColumn([{ name: "movement_code", referencedColumnName: "code" }])
  movement: Movement;
}
