import { PhysicalLocation } from "src/informatic/physical_locations/entities/physical_location.entity";
import { Employeed } from "src/rrhh/employeed/entities/employeed.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ schema: "informatic" })
export class PhysicalLocationEmployed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Employeed)
  @JoinTable()
  @JoinColumn({
    name: "employeed_code",
    referencedColumnName: "code",
  })
  employeed_code: string;

  @ManyToOne((type) => PhysicalLocation)
  @JoinTable()
  @JoinColumn({ name: "physical_location_code", referencedColumnName: "code" })
  physical_location_code: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  create_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
