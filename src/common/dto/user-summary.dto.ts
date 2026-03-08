import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserSummaryDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'traveler@example.com' })
  email: string;

  @ApiPropertyOptional({ example: 'travelbuddy_user' })
  username?: string;
}
