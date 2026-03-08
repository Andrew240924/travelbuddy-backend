import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';

export class RouteShortDto {
  @ApiProperty({ example: 12 })
  routeId: number;

  @ApiProperty({ example: 'Weekend in Saint Petersburg' })
  title: string;

  @ApiProperty({ enum: ['private', 'public'], example: 'public' })
  visibility: 'private' | 'public';

  @ApiPropertyOptional({ type: UserSummaryDto })
  author?: UserSummaryDto;
}
