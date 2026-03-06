import { IsInt, Min } from 'class-validator';

export class AddRouteCategoryDto {

  @IsInt()
  @Min(1)
  categoryId: number;
}
