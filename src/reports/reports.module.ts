import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { User } from '../users/user.entity';
import { Route } from '../routes/route.entity';
import { SavedRoute } from '../saved-routes/saved-route.entity';
import { Favorite } from '../favorites/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Route, SavedRoute, Favorite])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
