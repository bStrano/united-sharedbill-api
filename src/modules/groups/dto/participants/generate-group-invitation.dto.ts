import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateGroupInvitationDto {
  userId: string;
  @IsString()
  @ApiProperty()
  groupId: string;
}
