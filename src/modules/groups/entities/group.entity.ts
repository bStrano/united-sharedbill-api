import { Participant } from '../../participants/entities/participant.entity';
import { CommonEntity } from '@app/shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Expose } from 'class-transformer';
import { User } from '@app/modules/users/entities/user.entity';
import { GroupInterface } from '../../../../libs/united-sharedbill-core/src/modules/groups/entities/group.interface';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';

export class Group extends CommonEntity implements GroupInterface {
  id: string;
  title: string;
  description: string;
  icon: IconsEnum;
  ownerId: string;
  owner?: User;
  participants?: Participant[];

  private constructor(props?: Partial<Group>) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.icon = props.icon;
    this.ownerId = props.ownerId;
    this.owner = props.owner;
    this.participants = props.participants;
  }

  static create(props?: Partial<Group>) {
    return new Group(props);
  }

  @Expose()
  get participantsCount(): number {
    return this.participants?.length;
  }

  static createFromDto(ownerId: string, createDto: CreateGroupDto) {
    return new Group({
      id: uuid(),
      icon: createDto.icon,
      description: createDto.description,
      title: createDto.title,
      ownerId: ownerId,
    });
  }

  static createFromPrisma(props: Omit<Group, 'participantsCount'>) {
    return new Group({
      id: props.id,
      icon: props.icon,
      description: props.description,
      title: props.title,
      ownerId: props.ownerId,
      participants: props.participants.map((item) => {
        return Participant.createFromPrisma(item);
      }),
    });
  }
}
