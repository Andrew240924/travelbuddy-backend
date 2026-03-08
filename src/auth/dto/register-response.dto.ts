import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'traveler@example.com' })
  email: string;

  @ApiProperty({ example: 'travelbuddy_user' })
  username: string;
}
