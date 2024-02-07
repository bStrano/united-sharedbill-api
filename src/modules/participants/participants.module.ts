import { Module } from '@nestjs/common';
import { ParticipantsService } from './services/participants.service';
import { ParticipantsInvitationController } from './controllers/participants-invitation.controller';
import { ParticipantInvitationService } from './services/participant-invitation.service';
import { PrismaModule } from '@app/config/prisma/prisma.module';

@Module({
  controllers: [ParticipantsInvitationController],
  providers: [ParticipantsService, ParticipantInvitationService],
  imports: [PrismaModule],
})
export class ParticipantsModule {}
