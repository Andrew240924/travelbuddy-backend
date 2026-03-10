import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserDto } from './dto/jwt-user.dto';
import { UsersService } from './users.service';
import { RouteResponseDto } from '../routes/dto/route-response.dto';
import { SavedRouteResponseDto } from '../saved-routes/dto/saved-route-response.dto';
import { FavoriteResponseDto } from '../favorites/dto/favorite-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: JwtUserDto })
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update current user by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: JwtUserDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({
    description: 'You can update only your own profile',
  })
  @ApiConflictResponse({
    description: 'Email or username already in use',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.userId !== id) {
      throw new ForbiddenException('You can update only your own profile');
    }

    return this.usersService.updateById(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my private routes' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get('me/routes/private')
  getMyPrivateRoutes(@Request() req) {
    return this.usersService.findMyPrivateRoutes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my published routes' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get('me/routes/published')
  getMyPublishedRoutes(@Request() req) {
    return this.usersService.findMyPublishedRoutes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my saved routes' })
  @ApiOkResponse({ type: SavedRouteResponseDto, isArray: true })
  @Get('me/saved')
  getMySavedRoutes(@Request() req) {
    return this.usersService.findMySavedRoutes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my favorites' })
  @ApiOkResponse({ type: FavoriteResponseDto, isArray: true })
  @Get('me/favorites')
  getMyFavorites(@Request() req) {
    return this.usersService.findMyFavorites(req.user.userId);
  }
}
