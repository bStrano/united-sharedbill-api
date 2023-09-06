import { Participant } from '../../participants/entities/participant.entity';
import { Group } from '../../groups/entities/group.entity';

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

  owner: Participant;
  creator: Participant;
  group: Group;
}
