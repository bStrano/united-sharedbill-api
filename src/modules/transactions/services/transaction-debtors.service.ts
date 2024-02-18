import { TransactionDebtorsRepository } from '@app/modules/transactions/repositories/transaction-debtors.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionDebtorsService {
  constructor(
    private readonly transactionDebtorsRepository: TransactionDebtorsRepository,
  ) {}

  getListOfParticipantsOweUser(ownerId: string, groupId: string) {
    return this.transactionDebtorsRepository.getListOfParticipantsOweUser(
      ownerId,
      groupId,
    );
  }

  getListOfParticipantsUserOwe(ownerId: string, groupId: string) {
    return this.transactionDebtorsRepository.getListOfParticipantsUserOwe(
      ownerId,
      groupId,
    );
  }
}
