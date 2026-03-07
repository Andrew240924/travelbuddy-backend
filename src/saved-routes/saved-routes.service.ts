import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SavedRoute } from './saved-route.entity';
import { Route } from '../routes/route.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SavedRoutesService {

  constructor(
    @InjectRepository(SavedRoute)
    private savedRoutesRepository: Repository<SavedRoute>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async saveRoute(routeId: number, user: { userId: number }) {
    const route = await this.routesRepository.findOne({
      where: { routeId },
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    const existing = await this.savedRoutesRepository.findOne({
      where: {
        route: { routeId },
        user: { userId: user.userId },
      },
      relations: ['route', 'user'],
    });

    if (existing) {
      throw new ConflictException('Route already saved');
    }

    const savedRoute = this.savedRoutesRepository.create({
      route,
      user: { userId: user.userId } as User,
    });

    return this.savedRoutesRepository.save(savedRoute);
  }

  async removeSavedRoute(routeId: number, user: { userId: number }) {
    const savedRoute = await this.savedRoutesRepository.findOne({
      where: {
        route: { routeId },
        user: { userId: user.userId },
      },
      relations: ['route', 'user'],
    });

    if (!savedRoute) {
      throw new NotFoundException('Saved route not found');
    }

    await this.savedRoutesRepository.delete(savedRoute.savedRouteId);

    return {
      message: 'Route removed from saved',
    };
  }

  async findMySavedRoutes(user: { userId: number }) {
    return this.savedRoutesRepository.find({
      where: {
        user: { userId: user.userId },
      },
      relations: ['route', 'route.author'],
      order: {
        savedRouteId: 'DESC',
      },
    });
  }
}
