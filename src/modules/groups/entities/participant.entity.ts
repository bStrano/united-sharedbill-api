import { Group } from './group.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { TransactionDebtor } from '../../transactions/entities/transaction-debtor.entity';
import { CommonEntity } from '@app/shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';
import { ParticipantInterface } from '../../../../libs/united-sharedbill-core/src/modules/participants/entities/participant.interface';
import { TransactionOwner } from '@app/modules/transactions/entities/transaction-owner.entity';
import { User } from '@app/modules/users/entities/user.entity';

export class Participant extends CommonEntity implements ParticipantInterface {
  id: string;
  userId: string;
  groupId: string;
  group?: Group;
  transactions?: Transaction[];
  transactionOwners?: TransactionOwner[];
  transactionDebtors?: TransactionDebtor[];
  user?: User;

  constructor(props?: Partial<ParticipantInterface>) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.groupId = props.groupId;
    this.group = props.group as Group;
    this.user = props.user as User;
    this.transactions = props.transactions as Transaction[];
    this.transactionOwners = props.transactionOwners as TransactionOwner[];
    this.transactionDebtors = props.transactionDebtors as TransactionDebtor[];
  }

  static create(userId: string, groupId: string) {
    return new Participant({
      id: uuid(),
      userId,
      groupId,
    });
  }

  static createFromPrisma(data: ParticipantInterface) {
    return new Participant({
      ...data,
    });
  }
}
