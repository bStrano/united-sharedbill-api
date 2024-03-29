import { Participant } from '../../groups/entities/participant.entity';
import { Transaction } from './transaction.entity';
import { CommonEntity } from '@app/shared/commons/CommonEntity';
import { TransactionOwnerInterface } from '../../../../libs/united-sharedbill-core/src/modules/transaction-owners/entities/transaction-owner.interface';

export class TransactionOwner
  extends CommonEntity
  implements TransactionOwnerInterface
{
  participantId: string;
  transactionId: string;
  total: number;

  participant?: Participant;
  transaction?: Transaction;
}
