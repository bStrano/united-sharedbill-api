import { Module } from '@nestjs/common';
import { ParticipantsService } from './services/participants.service';
import { ParticipantsController } from './controllers/participants.controller';
import { ParticipantInvitationService } from './services/participant-invitation.service';
import { PrismaModule } from '../../config/prisma/prisma.module';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ParticipantInvitationService],
  imports: [PrismaModule],
})
export class ParticipantsModule {}
