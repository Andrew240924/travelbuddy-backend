import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';

export class CreateRouteDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(['private', 'public'])
  visibility?: 'private' | 'public';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(365)
  durationDays?: number;
}
