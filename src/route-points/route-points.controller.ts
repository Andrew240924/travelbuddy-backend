import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
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
  @Post('routes/:id/points')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRoutePointDto,
  ) {
    return this.routePointsService.create(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update route point by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RoutePointResponseDto })
  @Patch('points/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoutePointDto,
  ) {
    return this.routePointsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete route point by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @Delete('points/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.routePointsService.delete(id);
  }
}
