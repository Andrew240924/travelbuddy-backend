import {
  Controller,
  Post,
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
import { RouteCategoriesService } from './route-categories.service';
import { AddRouteCategoryDto } from './dto/add-route-category.dto';
import { RouteCategoryResponseDto } from './dto/route-category-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@Controller('routes')
@ApiTags('route-categories')
export class RouteCategoriesController {

  constructor(private routeCategoriesService: RouteCategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add category to route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiCreatedResponse({ type: RouteCategoryResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({ description: 'You can modify only your own routes' })
  @ApiNotFoundResponse({ description: 'Route or category not found' })
  @Post(':id/categories')
  addCategoryToRoute(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddRouteCategoryDto,
    @Request() req,
  ) {
    return this.routeCategoriesService.addCategoryToRoute(
      id,
      dto.categoryId,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove category from route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'categoryId', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @ApiForbiddenResponse({ description: 'You can modify only your own routes' })
  @ApiNotFoundResponse({ description: 'Route category relation not found' })
  @Delete(':id/categories/:categoryId')
  removeCategoryFromRoute(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Request() req,
  ) {
    return this.routeCategoriesService.removeCategoryFromRoute(
      id,
      categoryId,
      req.user,
    );
  }
}
