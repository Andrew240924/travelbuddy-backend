import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AddRouteCategoryDto {
  @ApiProperty({ minimum: 1, example: 3 })
  @IsInt()
  @Min(1)
  categoryId: number;
}
