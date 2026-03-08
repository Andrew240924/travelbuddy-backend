import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';
import { RouteShortDto } from '../../routes/dto/route-short.dto';

export class ReviewResponseDto {
  @ApiProperty({ example: 7 })
  reviewId: number;

  @ApiProperty({ minimum: 1, maximum: 5, example: 5 })
  rating: number;

  @ApiPropertyOptional({ example: 'Very beautiful route and clear plan.' })
  comment?: string;

  @ApiPropertyOptional({ type: UserSummaryDto })
  user?: UserSummaryDto;

  @ApiPropertyOptional({ type: RouteShortDto })
  route?: RouteShortDto;
}
