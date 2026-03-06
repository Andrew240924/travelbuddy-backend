import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  // controllers: [FavoritesController],
  // providers: [FavoritesService],
})
export class FavoritesModule {}
