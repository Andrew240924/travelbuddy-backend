import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponseDto {
  @ApiProperty({ example: '/uploads/routes/1739871261000-214623874.png' })
  imageUrl: string;
}
