import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';
import { RouteResponseDto } from '../../routes/dto/route-response.dto';

export class SavedRouteResponseDto {
  @ApiProperty({ example: 10 })
  savedRouteId: number;

  @ApiPropertyOptional({ type: UserSummaryDto })
  user?: UserSummaryDto;

  @ApiProperty({ type: RouteResponseDto })
  route: RouteResponseDto;
}
