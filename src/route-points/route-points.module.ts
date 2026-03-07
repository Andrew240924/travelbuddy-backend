import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutePoint } from './route-point.entity';
import { Route } from '../routes/route.entity';
import { RoutePointsController } from './route-points.controller';
import { RoutePointsService } from './route-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoutePoint, Route])],
  controllers: [RoutePointsController],
  providers: [RoutePointsService],
})
export class RoutePointsModule {}
