import { PrismaService } from '../../../config/prisma/PrismaService';
import { Group } from '../entities/group.entity';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(
    userWhereUniqueInput: Prisma.GroupsWhereUniqueInput,
  ): Promise<Group | null> {
    return this.prisma.groups.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(): Promise<Group[]> {
    return this.prisma.groups.findMany();
  }

  async create(data: Prisma.GroupsCreateInput): Promise<Group> {
    return this.prisma.groups.create({
      data,
    });
  }

  async update(id: string, updateDto: UpdateGroupDto): Promise<Group> {
    return this.prisma.groups.update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteById(id: string): Promise<Group> {
    return this.prisma.groups.delete({
      where: { id },
    });
  }
}
