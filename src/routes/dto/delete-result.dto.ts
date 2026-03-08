import { ApiProperty } from '@nestjs/swagger';

export class DeleteResultDto {
  @ApiProperty({ example: 1 })
  affected: number;

  @ApiProperty({ example: 0 })
  raw: number;
}
