import { Group } from '../../groups/entities/group.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { TransactionDebtor } from '../../transaction-debtors/entities/transaction-debtor.entity';
import { CommonEntity } from '../../../shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';

export class Participant extends CommonEntity {
  id: string;
  userId: string;
  groupId: string;
  group: Group;
  transactionCreatedByMe: Transaction[];
  transactionsOwnedByMe: Transaction[];
  transactionDebtor: TransactionDebtor[];

  private constructor(props?: Partial<Participant>) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.groupId = props.groupId;
    this.group = props.group;
    this.transactionCreatedByMe = props.transactionCreatedByMe;
    this.transactionsOwnedByMe = props.transactionsOwnedByMe;
    this.transactionDebtor = props.transactionDebtor;
  }

  static create(userId: string, groupId: string) {
    return new Participant({
      id: uuid(),
      userId,
      groupId,
    });
  }
}
