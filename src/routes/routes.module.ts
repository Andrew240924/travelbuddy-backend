import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './route.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  // controllers: [RoutesController],
  // providers: [RoutesService],
})
export class RoutesModule {}
