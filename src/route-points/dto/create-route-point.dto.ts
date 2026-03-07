import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateRoutePointDto {

  @IsInt()
  @Min(1)
  position: number;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  description?: string;
}
