import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';

export class RouteResponseDto {
  @ApiProperty({ example: 12 })
  routeId: number;

  @ApiProperty({ example: 'Weekend in Saint Petersburg' })
  title: string;

  @ApiPropertyOptional({ example: 'A short city trip with museums and food places.' })
  description?: string;

  @ApiPropertyOptional({ example: '/uploads/routes/1739871261000-214623874.jpg' })
  imageUrl?: string;

  @ApiProperty({ enum: ['private', 'public'], example: 'public' })
  visibility: 'private' | 'public';

  @ApiPropertyOptional({ example: 5 })
  durationDays?: number;

  @ApiProperty({ example: false })
  isCompleted: boolean;

  @ApiPropertyOptional({ type: UserSummaryDto })
  author?: UserSummaryDto;
}
