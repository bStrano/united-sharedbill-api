import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteSessionDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
