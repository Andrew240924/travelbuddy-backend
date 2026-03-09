import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { RoutePoint } from '../route-points/route-point.entity';

@Entity('routes')
export class Route {

  @PrimaryGeneratedColumn({ name: 'route_id' })
  routeId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({
    default: 'private',
  })
  visibility: 'private' | 'public';

  @Column({
    name: 'duration_days',
    nullable: true,
  })
  durationDays: number;

  @Column({
    name: 'is_completed',
    default: false,
  })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.routes, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => RoutePoint, (point) => point.route)
  points: RoutePoint[];
}
