import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';
import { User } from '../users/user.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoriesRepository.find({
      relations: ['creator'],
      order: {
        categoryId: 'ASC',
      },
    });
  }

  async create(dto: CreateCategoryDto, user: User) {
    const category = this.categoriesRepository.create({
      ...dto,
      creator: user,
    });

    return this.categoriesRepository.save(category);
  }
}
