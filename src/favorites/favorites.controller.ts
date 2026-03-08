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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@Controller('favorites')
@ApiTags('favorites')
export class FavoritesController {

  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add route to favorites' })
  @ApiParam({ name: 'routeId', type: Number })
  @ApiCreatedResponse({ type: FavoriteResponseDto })
  @Post(':routeId')
  addToFavorites(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.favoritesService.addToFavorites(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove route from favorites' })
  @ApiParam({ name: 'routeId', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @Delete(':routeId')
  removeFromFavorites(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.favoritesService.removeFromFavorites(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my favorites' })
  @ApiOkResponse({ type: FavoriteResponseDto, isArray: true })
  @Get()
  findMyFavorites(@Request() req) {
    return this.favoritesService.findMyFavorites(req.user);
  }
}
