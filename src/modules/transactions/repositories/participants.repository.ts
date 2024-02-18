import { PrismaService } from '@app/config/prisma/PrismaService';
import { Injectable } from '@nestjs/common';
import { Participant } from '@app/modules/groups/entities/participant.entity';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByGroupId(groupId: string) {
    const participants = await this.prismaService.participants.findMany({
      include: {
        user: true,
      },
      where: {
        groupId,
      },
    });

    return participants.map((participant) => {
      return Participant.createFromPrisma(participant);
    });
  }
}
