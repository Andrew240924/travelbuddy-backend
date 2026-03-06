import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Route } from '../routes/route.entity';

@Entity('route_points')
export class RoutePoint {

  @PrimaryGeneratedColumn({ name: 'point_id' })
  pointId: number;

  @Column()
  position: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Route, (route) => route.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;
}
