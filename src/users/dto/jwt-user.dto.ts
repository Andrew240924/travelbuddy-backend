import { ApiProperty } from '@nestjs/swagger';

export class JwtUserDto {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'traveler@example.com' })
  email: string;
}
