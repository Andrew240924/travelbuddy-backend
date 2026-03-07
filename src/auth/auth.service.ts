import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, username: string) {
    const hash = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email,
      password: hash,
      username,
    });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !password || !user.password) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException();
    const payload = {
      sub: user.userId,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
