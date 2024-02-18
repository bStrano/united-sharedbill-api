import { Injectable } from '@nestjs/common';
import { TransactionDebtorsService } from '@app/modules/transactions/services/transaction-debtors.service';
import { ParticipantsRepository } from '@app/modules/transactions/repositories/participants.repository';
import { ParticipantWithBalance } from '../../../../libs/united-sharedbill-core/src/modules/participants/returns/ParticipantWithBalance';
import { Participant } from '@app/modules/groups/entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly transactionDebtorsService: TransactionDebtorsService,
    private readonly participantsRepository: ParticipantsRepository,
  ) {}

  async findAllWithDebit(
    groupId: string,
    participantId: string,
  ): Promise<ParticipantWithBalance[]> {
    const participantsThatOweUser =
      await this.transactionDebtorsService.getListOfParticipantsOweUser(
        participantId,
        groupId,
      );
    const participantsThatUserOwesMap = new Map(
      participantsThatOweUser.map((i) => [i.participantId, i.total || 0]),
    );

    const participantsThatUserOwes =
      await this.transactionDebtorsService.getListOfParticipantsUserOwe(
        participantId,
        groupId,
      );
    const participantsThatOweUserMap = new Map(
      participantsThatUserOwes.map((i) => [i.participantId, i.total || 0]),
    );

    const participants = await this.findAllByGroup(groupId);

    return participants.map((participant) => {
      const debit = participantsThatUserOwesMap.get(participant.id) || 0;
      const credit = participantsThatOweUserMap.get(participant.id) || 0;

      return {
        ...participant,
        debit: debit,
        credit: credit,
        balance: credit - debit,
      };
    });
  }

  findAllByGroup(groupId: string): Promise<Participant[]> {
    return this.participantsRepository.findAllByGroupId(groupId);
  }
}
