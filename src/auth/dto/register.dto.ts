import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'traveler@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: 'secret123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'travelbuddy_user' })
  @IsString()
  username: string;
}
