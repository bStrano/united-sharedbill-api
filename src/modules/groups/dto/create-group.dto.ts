import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';

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
  icon: IconsEnum;
}
