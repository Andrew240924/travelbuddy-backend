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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@Controller()
@ApiTags('reviews')
export class ReviewsController {

  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create review for route' })
  @ApiParam({ name: 'id', type: Number })
  @ApiCreatedResponse({ type: ReviewResponseDto })
  @Post('routes/:id/review')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReviewDto,
    @Request() req,
  ) {
    return this.reviewsService.create(id, dto, req.user);
  }

  @ApiOperation({ summary: 'Get reviews by route id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ReviewResponseDto, isArray: true })
  @Get('routes/:id/reviews')
  findByRoute(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findByRoute(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update review by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: ReviewResponseDto })
  @Patch('reviews/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
    @Request() req,
  ) {
    return this.reviewsService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete review by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @Delete('reviews/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.reviewsService.delete(id, req.user);
  }
}
