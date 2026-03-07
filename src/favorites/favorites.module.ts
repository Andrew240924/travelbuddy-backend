import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favorite } from './favorite.entity';
import { Route } from '../routes/route.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Route])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
