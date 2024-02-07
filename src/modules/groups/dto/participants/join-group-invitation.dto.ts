import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinGroupInvitationDto {
  @ApiProperty()
  @IsString()
  invitationId: string;
  userId: string;
}
