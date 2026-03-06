import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
