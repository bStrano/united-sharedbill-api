import { Participant } from '../../participants/entities/participant.entity';
import { Transaction } from '@app/modules/transactions/entities/transaction.entity';
import { TransactionDebtorInterface } from '../../../../libs/united-sharedbill-core/src/modules/transaction-debtors/entities/transaction-debtor.interface';

export class TransactionDebtor implements TransactionDebtorInterface {
  participantId: string;
  transactionId: string;
  total: number;

  transaction?: Transaction;
  participant?: Participant;
}
