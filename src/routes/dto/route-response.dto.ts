import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';

export class RouteResponseDto {
  @ApiProperty({ example: 12 })
  routeId: number;

  @ApiProperty({ example: 'Weekend in Saint Petersburg' })
  title: string;

  @ApiPropertyOptional({ example: 'A short city trip with museums and food places.' })
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/route-cover.jpg' })
  imageUrl?: string;

  @ApiProperty({ enum: ['private', 'public'], example: 'public' })
  visibility: 'private' | 'public';

  @ApiPropertyOptional({ example: 5 })
  durationDays?: number;

  @ApiPropertyOptional({ type: UserSummaryDto })
  author?: UserSummaryDto;
}
