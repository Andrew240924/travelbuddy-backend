import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';

export class CreateRouteDto {
  @ApiProperty({ example: 'Weekend in Saint Petersburg' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'A short city trip with museums and food places.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '/uploads/routes/1739871261000-214623874.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ enum: ['private', 'public'], example: 'public' })
  @IsOptional()
  @IsEnum(['private', 'public'])
  visibility?: 'private' | 'public';

  @ApiPropertyOptional({ minimum: 1, maximum: 365, example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  durationDays?: number;
}
