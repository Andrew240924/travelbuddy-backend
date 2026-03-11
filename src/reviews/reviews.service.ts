import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './review.entity';
import { Route } from '../routes/route.entity';
import { User } from '../users/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
  ) {}

  async create(
    routeId: number,
    dto: CreateReviewDto,
    user: { userId: number },
  ) {
    const route = await this.routesRepository.findOne({
      where: { routeId, visibility: 'public' },
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    const existing = await this.reviewsRepository.findOne({
      where: {
        route: { routeId },
        user: { userId: user.userId },
      },
      relations: ['route', 'user'],
    });

    if (existing) {
      throw new ConflictException('Review already exists for this route');
    }

    const review = this.reviewsRepository.create({
      ...dto,
      route,
      user: { userId: user.userId } as User,
    });

    return this.reviewsRepository.save(review);
  }

  async findByRoute(routeId: number) {
    return this.reviewsRepository.find({
      where: {
        route: { routeId, visibility: 'public' },
      },
      relations: ['user', 'route'],
      order: {
        reviewId: 'DESC',
      },
    });
  }

  findShowcase(limit = 5) {
    return this.reviewsRepository.find({
      where: {
        route: { visibility: 'public' },
      },
      relations: ['user', 'route'],
      order: {
        reviewId: 'DESC',
      },
      take: limit,
    });
  }

  async update(
    reviewId: number,
    data: Partial<Review>,
    user: { userId: number },
  ) {
    const review = await this.reviewsRepository.findOne({
      where: { reviewId, user: { userId: user.userId } },
      relations: ['user', 'route'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewsRepository.update(review.reviewId, data);

    return this.reviewsRepository.findOne({
      where: { reviewId: review.reviewId },
      relations: ['user', 'route'],
    });
  }

  async delete(reviewId: number, user: { userId: number }) {
    const review = await this.reviewsRepository.findOne({
      where: { reviewId, user: { userId: user.userId } },
      relations: ['user', 'route'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.reviewsRepository.delete(review.reviewId);

    return {
      message: 'Review deleted',
    };
  }
}
