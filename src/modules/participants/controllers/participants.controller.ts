import { Controller, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParticipantInvitationService } from '../services/participant-invitation.service';
import { RequestUser } from '@app/shared/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { GenerateGroupInvitationDto } from '../dto/generate-group-invitation.dto';
import { JoinGroupInvitationDto } from '../dto/join-group-invitation.dto';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
  constructor(
    private readonly participantInvitationService: ParticipantInvitationService,
  ) {}

  @Post('/generate-invitation/:groupId')
  generateInvitation(
    @RequestUser() user: JWTPayload,
    @Param() params: GenerateGroupInvitationDto,
  ) {
    return this.participantInvitationService.generateInvitation({
      groupId: params.groupId,
      userId: user.userId,
    });
  }

  @Post('/join-group/:invitationId')
  joinGroup(
    @RequestUser() user: JWTPayload,
    @Param() params: JoinGroupInvitationDto,
  ) {
    return this.participantInvitationService.joinGroupInvitation({
      ...params,
      userId: user.userId,
    });
  }
}
