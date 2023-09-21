import { CommonEntity } from '../../../shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';

export class ParticipantInvitation extends CommonEntity {
  id: string;
  groupId: string;
  inviterId: string;
  expiresAt: Date;

  private constructor(props?: Partial<ParticipantInvitation>) {
    super();
    this.id = props.id;
    this.groupId = props.groupId;
    this.inviterId = props.inviterId;
    this.expiresAt = props.expiresAt;
  }

  isExpired() {
    return this.expiresAt.getTime() < Date.now();
  }

  static generateInvitation(groupId: string, inviterId: string) {
    return new ParticipantInvitation({
      id: uuid(),
      groupId: groupId,
      inviterId: inviterId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  }

  static create(props?: Partial<ParticipantInvitation>) {
    return new ParticipantInvitation(props);
  }
}
