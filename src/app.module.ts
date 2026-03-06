import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './routes/routes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SavedRoutesModule } from './saved-routes/saved-routes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RouteCategoriesModule } from './route-categories/route-categories.module';
import { CategoriesModule } from './categories/categories.module';
import { RoutePointsModule } from './route-points/route-points.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'TravelBuddyTestDB',

      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RoutesModule,
    ReviewsModule,
    SavedRoutesModule,
    FavoritesModule,
    RouteCategoriesModule,
    CategoriesModule,
    RoutePointsModule,
  ],
})
export class AppModule {}
