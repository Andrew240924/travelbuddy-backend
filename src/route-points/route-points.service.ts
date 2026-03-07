import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(routeId: number, dto: CreateRoutePointDto) {
    const route = await this.routesRepository.findOne({
      where: { routeId },
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    const point = this.routePointsRepository.create({
      ...dto,
      route,
    });

    return this.routePointsRepository.save(point);
  }

  async update(id: number, data: Partial<RoutePoint>) {
    const point = await this.routePointsRepository.findOne({
      where: { pointId: id },
      relations: ['route'],
    });

    if (!point) {
      throw new NotFoundException('Route point not found');
    }

    await this.routePointsRepository.update(point.pointId, data);

    return this.routePointsRepository.findOne({
      where: { pointId: id },
      relations: ['route'],
    });
  }

  async delete(id: number) {
    const point = await this.routePointsRepository.findOne({
      where: { pointId: id },
    });

    if (!point) {
      throw new NotFoundException('Route point not found');
    }

    await this.routePointsRepository.delete(point.pointId);

    return {
      message: 'Route point deleted',
    };
  }
}
