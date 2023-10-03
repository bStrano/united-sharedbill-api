import { Participant } from '../../participants/entities/participant.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

export class TransactionOwner {
  total: number;
  participantId: string;
  transactionId: string;

  participant?: Participant;
  transaction?: Transaction;
}
