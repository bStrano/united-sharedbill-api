import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { PrismaModule } from '@app/config/prisma/prisma.module';
import { ParticipantsInvitationController } from '@app/modules/groups/controllers/participants-invitation.controller';
import { ParticipantsService } from '@app/modules/groups/services/participants.service';
import { ParticipantInvitationService } from '@app/modules/groups/services/participant-invitation.service';

@Module({
  controllers: [GroupsController, ParticipantsInvitationController],
  providers: [GroupsService, ParticipantsService, ParticipantInvitationService],
  imports: [PrismaModule],
})
export class GroupsModule {}
