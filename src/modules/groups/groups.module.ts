import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { PrismaModule } from '@app/config/prisma/prisma.module';
import { ParticipantsInvitationController } from '@app/modules/groups/controllers/participants-invitation.controller';
import { ParticipantsService } from '@app/modules/groups/services/participants.service';
import { ParticipantInvitationService } from '@app/modules/groups/services/participant-invitation.service';
import { ParticipantsController } from '@app/modules/groups/controllers/participants.controller';
import { TransactionsModule } from '@app/modules/transactions/transactions.module';
import { ParticipantsRepository } from '@app/modules/transactions/repositories/participants.repository';

@Module({
  controllers: [
    GroupsController,
    ParticipantsInvitationController,
    ParticipantsController,
  ],
  providers: [
    GroupsService,
    ParticipantsService,
    ParticipantInvitationService,
    ParticipantsRepository,
  ],
  imports: [PrismaModule, TransactionsModule],
})
export class GroupsModule {}
