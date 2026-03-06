import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  // controllers: [CategoriesController],
  // providers: [CategoriesService],
})
export class CategoriesModule {}
