import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { AuthTokenResponseDto } from './dto/auth-token-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: RegisterResponseDto, description: 'User has been registered' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.username);
  }

  @ApiOperation({ summary: 'Login user and receive JWT token' })
  @ApiCreatedResponse({ type: AuthTokenResponseDto, description: 'Successful login' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
