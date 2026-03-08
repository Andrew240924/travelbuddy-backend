import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
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

import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

import { RoutesService } from './routes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RouteResponseDto } from './dto/route-response.dto';
import { DeleteResultDto } from './dto/delete-result.dto';

@Controller('routes')
@ApiTags('routes')
export class RoutesController {

  constructor(private routesService: RoutesService) {}

  @ApiOperation({ summary: 'Get all routes' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @ApiOperation({ summary: 'Get public routes only' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get('/public')
  findPublic() {
    return this.routesService.findPublic();
  }

  @ApiOperation({ summary: 'Get route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.routesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create route' })
  @ApiCreatedResponse({ type: RouteResponseDto })
  @Post()
  create(@Body() dto: CreateRouteDto, @Request() req) {
    return this.routesService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRouteDto) {
    return this.routesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DeleteResultDto })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.routesService.delete(id);
  }
}
