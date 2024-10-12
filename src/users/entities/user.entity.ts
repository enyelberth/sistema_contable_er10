import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}