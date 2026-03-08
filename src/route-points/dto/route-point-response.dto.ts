import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RouteShortDto } from '../../routes/dto/route-short.dto';

export class RoutePointResponseDto {
  @ApiProperty({ example: 21 })
  pointId: number;

  @ApiProperty({ example: 1 })
  position: number;

  @ApiProperty({ example: 'Russia' })
  country: string;

  @ApiProperty({ example: 'Moscow' })
  city: string;

  @ApiPropertyOptional({ example: 'Start point near Red Square.' })
  description?: string;

  @ApiPropertyOptional({ type: RouteShortDto })
  route?: RouteShortDto;
}
