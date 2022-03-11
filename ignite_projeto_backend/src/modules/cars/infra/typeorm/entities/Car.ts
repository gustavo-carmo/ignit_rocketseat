import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import Category from './Category';
import Specification from './Specification';

@Entity('cars')
export default class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  available: boolean;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
