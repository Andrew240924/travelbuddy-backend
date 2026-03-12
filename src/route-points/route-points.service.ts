import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoutePoint } from './route-point.entity';
import { Route } from '../routes/route.entity';
import { CreateRoutePointDto } from './dto/create-route-point.dto';

@Injectable()
export class RoutePointsService {

  constructor(
    @InjectRepository(RoutePoint)
    private routePointsRepository: Repository<RoutePoint>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async findByRoute(routeId: number) {
    return this.routePointsRepository.find({
      where: {
        route: { routeId },
      },
      relations: ['route'],
      order: {
        position: 'ASC',
      },
    });
  }

  async create(routeId: number, dto: CreateRoutePointDto, user: { userId: number }) {
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

    const point = this.routePointsRepository.create({
      ...dto,
      route,
    });

    return this.routePointsRepository.save(point);
  }

  async update(id: number, data: Partial<RoutePoint>, user: { userId: number }) {
    const point = await this.routePointsRepository.findOne({
      where: { pointId: id },
      relations: ['route', 'route.author'],
    });

    if (!point) {
      throw new NotFoundException('Route point not found');
    }

    if (point.route?.author?.userId !== user.userId) {
      throw new ForbiddenException('You can modify only your own routes');
    }

    await this.routePointsRepository.update(point.pointId, data);

    return this.routePointsRepository.findOne({
      where: { pointId: id },
      relations: ['route'],
    });
  }

  async delete(id: number, user: { userId: number }) {
    const point = await this.routePointsRepository.findOne({
      where: { pointId: id },
      relations: ['route', 'route.author'],
    });

    if (!point) {
      throw new NotFoundException('Route point not found');
    }

    if (point.route?.author?.userId !== user.userId) {
      throw new ForbiddenException('You can modify only your own routes');
    }

    await this.routePointsRepository.delete(point.pointId);

    return {
      message: 'Route point deleted',
    };
  }
}
