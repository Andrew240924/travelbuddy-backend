import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create category' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @Post()
  create(@Body() dto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create(dto, req.user);
  }
}
