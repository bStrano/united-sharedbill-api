import { Participant } from '../../participants/entities/participant.entity';
import { CommonEntity } from '@app/shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';
import { CreateGroupDto } from '../dto/create-group.dto';
import { Expose } from 'class-transformer';
import { User } from '@app/modules/users/entities/user.entity';
import { GroupInterface } from '../../../../libs/united-sharedbill-core/src/modules/groups/entities/group.interface';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';

interface GroupInterfacePrisma
  extends Omit<GroupInterface, 'icon' | 'participantsCount'> {
  icon: string;
}
export class Group extends CommonEntity implements GroupInterface {
  id: string;
  title: string;
  description: string;
  icon: IconsEnum;
  ownerId: string;
  owner?: User;
  participants?: Participant[];

  private constructor(props?: Partial<GroupInterface>) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.icon = props.icon;
    this.ownerId = props.ownerId;
    this.owner = props.owner;
    this.participants = props.participants as Participant[];
  }

  isMember(userId: string) {
    return this.participants?.some((item) => item.userId === userId);
  }

  static create(props?: Partial<GroupInterface>) {
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

  static createFromPrisma(props: GroupInterfacePrisma) {
    return new Group({
      id: props.id,
      icon: props.icon as IconsEnum,
      description: props.description,
      title: props.title,
      ownerId: props.ownerId,
      owner: User.createFromPrisma(props.owner),
      participants: props.participants?.map((item) => {
        return Participant.createFromPrisma(item);
      }),
    });
  }
}
