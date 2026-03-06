import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Route } from '../routes/route.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany(() => Route, (route) => route.author)
  routes: Route[];
}
