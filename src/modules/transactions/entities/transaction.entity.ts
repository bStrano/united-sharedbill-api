import { Group } from '../../groups/entities/group.entity';
import { TransactionOwner } from '../../transaction-owners/entities/transaction-owner.entity';
import { TransactionDebtor } from '@app/modules/transaction-debtors/entities/transaction-debtor.entity';
import { TransactionInterface } from '../../../../libs/united-sharedbill-core/src/modules/transactions/entities/transaction.interface';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';
import { User } from '@app/modules/users/entities/user.entity';

export class Transaction implements TransactionInterface {
  id: string;
  title: string;
  description: string;
  total: number;
  icon: IconsEnum;
  isSettled: boolean;
  groupId: string;
  creatorId: string;
  debtors?: TransactionDebtor[];
  owners?: TransactionOwner[];
  creator?: User;
  group?: Group;
  createdAt: Date;
  updatedAt: Date;

  constructor() {}
}
