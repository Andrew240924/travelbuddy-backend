import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'traveler@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'travelbuddy_user' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ minLength: 6, example: 'newSecret123' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
