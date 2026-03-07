import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SavedRoute } from './saved-route.entity';
import { Route } from '../routes/route.entity';
import { SavedRoutesController } from './saved-routes.controller';
import { SavedRoutesService } from './saved-routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SavedRoute, Route])],
  controllers: [SavedRoutesController],
  providers: [SavedRoutesService],
})
export class SavedRoutesModule {}
