import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateRoutePointDto {
  @ApiProperty({ minimum: 1, example: 1 })
  @IsInt()
  @Min(1)
  position: number;

  @ApiProperty({ example: 'Russia' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Moscow' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'Start point near Red Square.' })
  @IsOptional()
  @IsString()
  description?: string;
}
