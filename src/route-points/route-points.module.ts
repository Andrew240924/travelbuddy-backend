import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutePoint } from './route-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutePoint])],
  // controllers: [RoutePointsController],
  // providers: [RoutePointsService],
})
export class RoutePointsModule {}
