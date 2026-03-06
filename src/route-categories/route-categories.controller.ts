import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RouteCategoriesService } from './route-categories.service';
import { AddRouteCategoryDto } from './dto/add-route-category.dto';

@Controller()
export class RouteCategoriesController {

  constructor(private routeCategoriesService: RouteCategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('routes/:id/categories')
  addCategoryToRoute(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddRouteCategoryDto,
  ) {
    return this.routeCategoriesService.addCategoryToRoute(id, dto.categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('routes/:id/categories/:categoryId')
  removeCategoryFromRoute(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.routeCategoriesService.removeCategoryFromRoute(id, categoryId);
  }
}
