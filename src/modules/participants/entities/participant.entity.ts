import { Group } from '../../groups/entities/group.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { TransactionDebtor } from '../../transaction-debtors/entities/transaction-debtor.entity';
import { CommonEntity } from '@app/shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';
import { ParticipantInterface } from '../../../../libs/united-sharedbill-core/src/modules/participants/entities/participant.interface';
import { TransactionOwner } from '@app/modules/transaction-owners/entities/transaction-owner.entity';

export class Participant extends CommonEntity implements ParticipantInterface {
  id: string;
  userId: string;
  groupId: string;
  group?: Group;
  transactions?: Transaction[];
  transactionOwners?: TransactionOwner[];
  transactionDebtors?: TransactionDebtor[];

  constructor(props?: Partial<ParticipantInterface>) {
    super();
    this.id = props.id;
    this.userId = props.userId;
    this.groupId = props.groupId;
    this.group = props.group as Group;
    this.transactions = props.transactions as Transaction[];
    this.transactionOwners = props.transactionOwners as TransactionOwner[];
    this.transactionDebtors = props.transactionDebtors;
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
