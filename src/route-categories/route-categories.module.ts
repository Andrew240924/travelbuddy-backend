import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteCategory } from './route-category.entity';
import { RouteCategoriesController } from './route-categories.controller';
import { RouteCategoriesService } from './route-categories.service';
import { Route } from '../routes/route.entity';
import { Category } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteCategory, Route, Category])],
  controllers: [RouteCategoriesController],
  providers: [RouteCategoriesService],
})
export class RouteCategoriesModule {}
