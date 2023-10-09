import { Transaction } from '@app/modules/transactions/entities/transaction.entity';
import { v4 as uuid } from 'uuid';
import { ParticipantAmount } from '@app/modules/transactions/dto/create-expense.dto';
import { BadRequestException } from '@nestjs/common';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';

export class TransactionBuilder {
  private transaction: Transaction;

  constructor() {
    this.reset();
  }

  public generateId(): TransactionBuilder {
    this.transaction.id = uuid();
    return this;
  }

  public withCommonFields(
    title: string,
    description: string,
    total: number,
    icon: IconsEnum,
    groupId: string,
  ): TransactionBuilder {
    this.transaction.title = title;
    this.transaction.description = description;
    this.transaction.total = total;
    this.transaction.icon = icon;
    this.transaction.isSettled = false;
    this.transaction.groupId = groupId;
    return this;
  }

  public withDebtorsEquallyDivision(
    participantsAmount: ParticipantAmount[],
  ): TransactionBuilder {
    this.transaction.debtors = participantsAmount.map((participant) => {
      return {
        participantId: participant.participantId,
        transactionId: this.transaction.id,
        total: this.transaction.total / participantsAmount.length,
      };
    });

    return this;
  }

  public withDebtorsUnequallyDivision(
    participantsAmount: ParticipantAmount[],
  ): TransactionBuilder {
    const debtors = participantsAmount.map((participant) => {
      return {
        participantId: participant.participantId,
        transactionId: this.transaction.id,
        total: participant.value,
      };
    });

    if (
      debtors.reduce((acc, curr) => acc + curr.total, 0) !==
      this.transaction.total
    ) {
      throw new BadRequestException(
        'The sum of debtors is not equal to the total',
      );
    }
    return this;
  }

  public withDebtorsPercentageDivision(
    participantsAmount: ParticipantAmount[],
  ): TransactionBuilder {
    const debtors = participantsAmount.map((participant) => {
      return {
        participantId: participant.participantId,
        transactionId: this.transaction.id,
        total: participant.value,
      };
    });

    if (debtors.reduce((acc, curr) => acc + curr.total, 0) > 100) {
      throw new BadRequestException(
        'The sum of debtors cant be greater than 100%',
      );
    }
    return this;
  }

  public withDebtorsExtraExpensesDivision(
    participantsAmount: ParticipantAmount[],
  ) {
    const extraExpenseTotal = participantsAmount.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );

    if (extraExpenseTotal > this.transaction.total) {
      throw new BadRequestException(
        'The sum of debtors cant be greater than the total',
      );
    }

    const remainingTotal = this.transaction.total - extraExpenseTotal;

    this.transaction.debtors = participantsAmount.map((participant) => {
      return {
        participantId: participant.participantId,
        transactionId: this.transaction.id,
        total: remainingTotal / participantsAmount.length + participant.value,
      };
    });

    return this;
  }

  public withDebtorsPartsDivision(participantsAmount: ParticipantAmount[]) {
    const totalParts = participantsAmount.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );

    this.transaction.debtors = participantsAmount.map((participant) => {
      return {
        participantId: participant.participantId,
        transactionId: this.transaction.id,
        total: (participant.value * 100) / totalParts,
      };
    });

    return this;
  }

  public withOwners(ownersAmount: ParticipantAmount[]): TransactionBuilder {
    if (
      ownersAmount.reduce((acc, curr) => acc + curr.value, 0) !==
      this.transaction.total
    ) {
      throw new BadRequestException(
        'The sum of owners is not equal to the total',
      );
    }
    this.transaction.owners = ownersAmount.map((owner) => {
      return {
        participantId: owner.participantId,
        transactionId: this.transaction.id,
        total: owner.value,
        createdAt: new Date(),
      };
    });
    return this;
  }

  reset() {
    this.transaction = new Transaction();
    return this;
  }

  build(): Transaction {
    return this.transaction;
  }
}
