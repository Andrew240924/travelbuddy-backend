import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from './favorite.entity';
import { Route } from '../routes/route.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FavoritesService {

  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async addToFavorites(routeId: number, user: { userId: number }) {
    const route = await this.routesRepository.findOne({
      where: { routeId },
      relations: ['author'],
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    const isPrivateRoute = route.visibility === 'private';
    const isOwnRoute = route.author?.userId === user.userId;

    if (isPrivateRoute && !isOwnRoute) {
      throw new NotFoundException('Route not found');
    }

    const existing = await this.favoritesRepository.findOne({
      where: {
        route: { routeId },
        user: { userId: user.userId },
      },
      relations: ['route', 'user'],
    });

    if (existing) {
      throw new ConflictException('Route already in favorites');
    }

    const favorite = this.favoritesRepository.create({
      route,
      user: { userId: user.userId } as User,
    });

    return this.favoritesRepository.save(favorite);
  }

  async removeFromFavorites(routeId: number, user: { userId: number }) {
    const favorite = await this.favoritesRepository.findOne({
      where: {
        route: { routeId },
        user: { userId: user.userId },
      },
      relations: ['route', 'user'],
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoritesRepository.delete(favorite.favoriteId);

    return {
      message: 'Route removed from favorites',
    };
  }

  async findMyFavorites(user: { userId: number }) {
    return this.favoritesRepository.find({
      where: {
        user: { userId: user.userId },
      },
      relations: ['route', 'route.author'],
      order: {
        favoriteId: 'DESC',
      },
    });
  }
}
