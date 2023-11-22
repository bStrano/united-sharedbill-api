import { PrismaService } from '@app/config/prisma/PrismaService';
import { Group } from '../entities/group.entity';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { User } from '@app/modules/users/entities/user.entity';
import { IconsEnum } from '../../../../libs/united-sharedbill-core/src/shared/enums/icons.enum';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(
    userWhereUniqueInput: Prisma.GroupsWhereUniqueInput,
  ): Promise<Group | null> {
    const groupRaw = await this.prisma.groups.findUnique({
      where: userWhereUniqueInput,
    });

    return Group.create({ ...groupRaw, icon: groupRaw.icon as IconsEnum });
  }

  async findAll(userId: string): Promise<Group[]> {
    const groupsRaw = await this.prisma.groups.findMany({
      include: {
        participants: true,
        owner: true,
      },
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
    });
    return groupsRaw.map((item) => {
      return Group.createFromPrisma({
        ...item,
        icon: item.icon as IconsEnum,
        owner: User.createFromPrisma(item.owner),
        participants: item.participants,
      });
    });
  }

  async create(data: Prisma.GroupsCreateInput): Promise<Group> {
    const groupRaw = await this.prisma.groups.create({
      data,
    });
    return Group.create({ ...groupRaw, icon: data.icon as IconsEnum });
  }

  async update(id: string, updateDto: UpdateGroupDto): Promise<void> {
    this.prisma.groups.update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteById(id: string): Promise<void> {
    this.prisma.groups.delete({
      where: { id },
    });
  }
}
