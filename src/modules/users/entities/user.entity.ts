import { UserInterface } from '../../../../libs/united-sharedbill-core/src/modules/users/entities/UserInterface';
import { GroupInterface } from '../../../../libs/united-sharedbill-core/src/modules/groups/entities/group.interface';
import { ParticipantInterface } from '../../../../libs/united-sharedbill-core/src/modules/participants/entities/participant.interface';
import { TransactionInterface } from '../../../../libs/united-sharedbill-core/src/modules/transactions/entities/transaction.interface';

export class User implements UserInterface {
  email: string;
  id: string;
  name: string;
  oauthId: string;
  password: string;
  providerId?: string;
  groups?: GroupInterface[];
  participants?: ParticipantInterface[];
  transactionsCreatedByMe?: TransactionInterface[];

  private constructor(props?: Partial<User>) {
    this.email = props.email;
    this.groups = props.groups;
    this.id = props.id;
    this.name = props.name;
    this.oauthId = props.oauthId;
    this.participants = props.participants;
    this.password = props.password;
    this.transactionsCreatedByMe = props.transactionsCreatedByMe;
    this.providerId = props.providerId;
  }

  static createFromPrisma(data: User) {
    return new User({
      ...data,
    });
  }
}
