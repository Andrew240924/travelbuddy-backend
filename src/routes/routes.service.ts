import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Route } from './route.entity';
import { User } from '../users/user.entity';
import { CreateRouteDto } from './dto/create-route.dto';

@Injectable()
export class RoutesService {

  constructor(
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async create(dto: CreateRouteDto, user: User) {
    const route = this.routesRepository.create({
      ...dto,
      author: user,
    });
    return this.routesRepository.save(route);
  }

  async findPublic() {
    return this.routesRepository.find({
      where: {
        visibility: 'public',
      },
      relations: ['author'],
    });
  }

  async findAll() {
    return this.routesRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: number) {
    return this.routesRepository.findOne({
      where: { routeId: id },
      relations: ['author'],
    });
  }

  async update(id: number, data: Partial<Route>) {
    await this.routesRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    return this.routesRepository.delete(id);
  }

  async publish(id: number) {
    await this.routesRepository.update(id, {
      visibility: 'public',
    });
    return this.findOne(id);
  }

  async complete(id: number) {
    await this.routesRepository.update(id, {
      isCompleted: true,
    });
    return this.findOne(id);
  }
}
