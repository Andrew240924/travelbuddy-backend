import { ApiProperty } from '@nestjs/swagger';
import { RouteShortDto } from '../../routes/dto/route-short.dto';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class RouteCategoryResponseDto {
  @ApiProperty({ example: 4 })
  routeCategoryId: number;

  @ApiProperty({ type: RouteShortDto })
  route: RouteShortDto;

  @ApiProperty({ type: CategoryResponseDto })
  category: CategoryResponseDto;
}
