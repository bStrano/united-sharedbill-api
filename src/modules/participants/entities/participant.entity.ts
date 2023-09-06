import { Group } from '../../groups/entities/group.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { TransactionDebtor } from '../../transaction-debtors/entities/transaction-debtor.entity';
import { CommonEntity } from '../../../shared/commons/CommonEntity';

export class Participant extends CommonEntity {
  id: string;
  name: string;
  email: string;
  userId: string;
  groupId: string;
  group: Group;
  transactionCreatedByMe: Transaction[];
  transactionsOwnedByMe: Transaction[];
  transactionDebtor: TransactionDebtor[];
}
