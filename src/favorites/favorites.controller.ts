import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {

  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':routeId')
  addToFavorites(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.favoritesService.addToFavorites(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':routeId')
  removeFromFavorites(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.favoritesService.removeFromFavorites(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findMyFavorites(@Request() req) {
    return this.favoritesService.findMyFavorites(req.user);
  }
}
