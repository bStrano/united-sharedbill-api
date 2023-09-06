import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsString()
  icon: string;
}
