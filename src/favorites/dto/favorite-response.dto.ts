import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';
import { RouteResponseDto } from '../../routes/dto/route-response.dto';

export class FavoriteResponseDto {
  @ApiProperty({ example: 10 })
  favoriteId: number;

  @ApiPropertyOptional({ type: UserSummaryDto })
  user?: UserSummaryDto;

  @ApiProperty({ type: RouteResponseDto })
  route: RouteResponseDto;
}
