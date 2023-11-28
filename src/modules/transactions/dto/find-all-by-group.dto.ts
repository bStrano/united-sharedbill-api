import { IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllByGroupDto {
  @IsUUID()
  @ApiProperty({ example: '243c27cb-fdae-46f8-bbb4-06972d623fab' })
  groupId: string;
  @IsNumber()
  @ApiProperty({ example: -120 })
  @Type(() => Number)
  timezoneOffset: number;
}
