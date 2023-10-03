import { Participant } from '../../participants/entities/participant.entity';
import { Group } from '../../groups/entities/group.entity';
import { TransactionOwner } from '../../transaction-owners/entities/transaction-owner.entity';
import { TransactionDebtor } from '@app/modules/transaction-debtors/entities/transaction-debtor.entity';

export class Transaction {
  id: string;
  title: string;
  description: string;
  total: number;
  icon: string;
  isSettled: boolean;
  groupId: string;
  ownedId: string;
  creatorId: string;

  debtors: TransactionDebtor[];
  owners: TransactionOwner[];
  creator: Participant;
  group: Group;

  constructor() {}
}
