import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Route } from '../routes/route.entity';

@Entity('reviews')
export class Review {

  @PrimaryGeneratedColumn({ name: 'review_id' })
  reviewId: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Route, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;
}
