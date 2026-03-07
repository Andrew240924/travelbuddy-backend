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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutePointsService } from './route-points.service';
import { CreateRoutePointDto } from './dto/create-route-point.dto';
import { UpdateRoutePointDto } from './dto/update-route-point.dto';

@Controller()
export class RoutePointsController {

  constructor(private routePointsService: RoutePointsService) {}

  @Get('routes/:id/points')
  findByRoute(@Param('id', ParseIntPipe) id: number) {
    return this.routePointsService.findByRoute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('routes/:id/points')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRoutePointDto,
  ) {
    return this.routePointsService.create(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('points/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoutePointDto,
  ) {
    return this.routePointsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('points/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.routePointsService.delete(id);
  }
}
