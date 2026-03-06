import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteCategory } from './route-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteCategory])],
  // controllers: [RouteCategoriesController],
  // providers: [RouteCategoriesService],
})
export class RouteCategoriesModule {}
