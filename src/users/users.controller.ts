import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserDto } from './dto/jwt-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: JwtUserDto })
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
