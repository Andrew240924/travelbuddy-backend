import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RouteCategory } from './route-category.entity';
import { Route } from '../routes/route.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class RouteCategoriesService {

  constructor(
    @InjectRepository(RouteCategory)
    private routeCategoriesRepository: Repository<RouteCategory>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategoryToRoute(
    routeId: number,
    categoryId: number,
    user: { userId: number },
  ) {
    const route = await this.routesRepository.findOne({
      where: { routeId },
      relations: ['author'],
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    if (route.author?.userId !== user.userId) {
      throw new ForbiddenException('You can modify only your own routes');
    }

    const category = await this.categoriesRepository.findOne({
      where: { categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const existing = await this.routeCategoriesRepository.findOne({
      where: {
        route: { routeId },
        category: { categoryId },
      },
      relations: ['route', 'category'],
    });

    if (existing) {
      throw new ConflictException('Category already attached to route');
    }

    const routeCategory = this.routeCategoriesRepository.create({
      route,
      category,
    });

    return this.routeCategoriesRepository.save(routeCategory);
  }

  async removeCategoryFromRoute(
    routeId: number,
    categoryId: number,
    user: { userId: number },
  ) {
    const existing = await this.routeCategoriesRepository.findOne({
      where: {
        route: { routeId },
        category: { categoryId },
      },
      relations: ['route', 'route.author', 'category'],
    });

    if (!existing) {
      throw new NotFoundException('Route category relation not found');
    }

    if (existing.route?.author?.userId !== user.userId) {
      throw new ForbiddenException('You can modify only your own routes');
    }

    await this.routeCategoriesRepository.delete(existing.routeCategoryId);

    return {
      message: 'Category detached from route',
    };
  }
}
