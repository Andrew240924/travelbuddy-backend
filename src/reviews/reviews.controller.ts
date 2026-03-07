import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller()
export class ReviewsController {

  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('routes/:id/review')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReviewDto,
    @Request() req,
  ) {
    return this.reviewsService.create(id, dto, req.user);
  }

  @Get('routes/:id/reviews')
  findByRoute(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findByRoute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reviews/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
    @Request() req,
  ) {
    return this.reviewsService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('reviews/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.reviewsService.delete(id, req.user);
  }
}
