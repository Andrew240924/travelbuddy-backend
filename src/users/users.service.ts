import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import { Route } from '../routes/route.entity';
import { SavedRoute } from '../saved-routes/saved-route.entity';
import { Favorite } from '../favorites/favorite.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
    @InjectRepository(SavedRoute)
    private savedRoutesRepository: Repository<SavedRoute>,
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      const dbError = error as QueryFailedError & {
        code?: string;
        constraint?: string;
        detail?: string;
      };

      // PostgreSQL unique violation: https://www.postgresql.org/docs/current/errcodes-appendix.html
      if (dbError.code === '23505') {
        if (
          dbError.constraint?.includes('email') ||
          dbError.detail?.includes('(email)')
        ) {
          throw new ConflictException('Email already in use');
        }

        if (
          dbError.constraint?.includes('username') ||
          dbError.detail?.includes('(username)')
        ) {
          throw new ConflictException('Username already in use');
        }

        throw new ConflictException('Email or username already in use');
      }

      throw error;
    }
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'password', 'username'],
    });
  }

  findById(id: number) {
    return this.usersRepository.findOne({
      where: { userId: id },
    });
  }

  async updateById(id: number, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { userId: id },
      select: ['userId', 'email', 'password', 'username'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingByEmail = await this.usersRepository.findOne({
        where: { email: dto.email },
      });

      if (existingByEmail) {
        throw new ConflictException('Email already in use');
      }

      user.email = dto.email;
    }

    if (dto.username && dto.username !== user.username) {
      const existingByUsername = await this.usersRepository.findOne({
        where: { username: dto.username },
      });

      if (existingByUsername) {
        throw new ConflictException('Username already in use');
      }

      user.username = dto.username;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.usersRepository.save(user);

    return {
      userId: updated.userId,
      email: updated.email,
      username: updated.username,
    };
  }

  findMyPrivateRoutes(userId: number) {
    return this.routesRepository.find({
      where: {
        author: { userId },
        visibility: 'private',
      },
      relations: ['author'],
      order: {
        routeId: 'DESC',
      },
    });
  }

  findMyPublishedRoutes(userId: number) {
    return this.routesRepository.find({
      where: {
        author: { userId },
        visibility: 'public',
      },
      relations: ['author'],
      order: {
        routeId: 'DESC',
      },
    });
  }

  findMySavedRoutes(userId: number) {
    return this.savedRoutesRepository.find({
      where: {
        user: { userId },
      },
      relations: ['route', 'route.author'],
      order: {
        savedRouteId: 'DESC',
      },
    });
  }

  findMyFavorites(userId: number) {
    return this.favoritesRepository.find({
      where: {
        user: { userId },
      },
      relations: ['route', 'route.author'],
      order: {
        favoriteId: 'DESC',
      },
    });
  }
}
