import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_public', default: false })
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
