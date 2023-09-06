import { Participant } from '../../participants/entities/participant.entity';

export class TransactionDebtor {
  id: string;
  participant: Participant;
  participantId: string;
  total: number;
}
