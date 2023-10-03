import { Participant } from '../../participants/entities/participant.entity';
import { Transaction } from '@app/modules/transactions/entities/transaction.entity';

export class TransactionDebtor {
  participantId: string;
  transactionId: string;
  total: number;

  transaction?: Transaction;
  participant?: Participant;
}
