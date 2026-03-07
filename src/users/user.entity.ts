import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Route } from '../routes/route.entity';
import { Category } from '../categories/category.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Route, (route) => route.author)
  routes: Route[];

  @OneToMany(() => Category, (category) => category.creator)
  categories: Category[];
}
