import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserSummaryDto } from '../../common/dto/user-summary.dto';

export class CategoryShortDto {
  @ApiProperty({ example: 3 })
  categoryId: number;

  @ApiProperty({ example: 'Nature' })
  name: string;
}

export class CategoryResponseDto extends CategoryShortDto {
  @ApiProperty({ example: true })
  isPublic: boolean;

  @ApiPropertyOptional({ type: UserSummaryDto })
  creator?: UserSummaryDto;
}
