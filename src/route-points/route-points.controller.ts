import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutePointsService } from './route-points.service';
import { CreateRoutePointDto } from './dto/create-route-point.dto';
import { UpdateRoutePointDto } from './dto/update-route-point.dto';
import { RoutePointResponseDto } from './dto/route-point-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@Controller()
@ApiTags('route-points')
export class RoutePointsController {

  constructor(private routePointsService: RoutePointsService) {}

  @ApiOperation({ summary: 'Get route points by route id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RoutePointResponseDto, isArray: true })
  @Get('routes/:id/points')
  findByRoute(@Param('id', ParseIntPipe) id: number) {
    return this.routePointsService.findByRoute(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create route point for route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiCreatedResponse({ type: RoutePointResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({ description: 'You can modify only your own routes' })
  @ApiNotFoundResponse({ description: 'Route not found' })
  @Post('routes/:id/points')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRoutePointDto,
    @Request() req,
  ) {
    return this.routePointsService.create(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update route point by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RoutePointResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({ description: 'You can modify only your own routes' })
  @ApiNotFoundResponse({ description: 'Route point not found' })
  @Patch('points/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoutePointDto,
    @Request() req,
  ) {
    return this.routePointsService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete route point by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({ description: 'You can modify only your own routes' })
  @ApiNotFoundResponse({ description: 'Route point not found' })
  @Delete('points/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.routePointsService.delete(id, req.user);
  }
}
