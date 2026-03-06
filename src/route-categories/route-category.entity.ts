import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Route } from '../routes/route.entity';
import { Category } from '../categories/category.entity';

@Entity('route_categories')
export class RouteCategory {

  @PrimaryGeneratedColumn({ name: 'route_category_id' })
  routeCategoryId: number;

  @ManyToOne(() => Route, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @ManyToOne(() => Category, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
