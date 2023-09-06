import { Participant } from '../../participants/entities/participant.entity';
import { CommonEntity } from '../../../shared/commons/CommonEntity';
import { v4 as uuid } from 'uuid';
import { CreateGroupDto } from '../dto/create-group.dto';

export class Group extends CommonEntity {
  id: string;
  title: string;
  description: string;
  icon: string;
  ownerId: string;
  owner?: Participant;
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

  static createFromDto(ownerId: string, createDto: CreateGroupDto) {
    return new Group({
      id: uuid(),
      icon: createDto.icon,
      description: createDto.description,
      title: createDto.title,
      ownerId: ownerId,
    });
  }
}
