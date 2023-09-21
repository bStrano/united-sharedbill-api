import { ParticipantInvitation } from '../entities/participant-invitation.entity';
import { GenerateGroupInvitationDto } from '../dto/generate-group-invitation.dto';
import { JoinGroupInvitationDto } from '../dto/join-group-invitation.dto';
import { PrismaService } from '../../../config/prisma/PrismaService';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Participant } from '../entities/participant.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ParticipantInvitationService {
  constructor(private readonly prisma: PrismaService) {}

  async generateInvitation(generateInvitation: GenerateGroupInvitationDto) {
    const group = await this.prisma.groups.findFirst({
      where: { id: generateInvitation.groupId },
      include: {
        participants: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found.');
    }

    const inviter = group.participants.find(
      (participant) => participant.userId === generateInvitation.userId,
    );
    if (!inviter) {
      throw new ForbiddenException('You dont have access to this group');
    }

    const invitation = ParticipantInvitation.generateInvitation(
      generateInvitation.groupId,
      generateInvitation.userId,
    );

    return this.prisma.participantInvitations.create({
      data: {
        id: uuidv4().toString(),
        group: {
          connect: {
            id: group.id,
          },
        },
        inviter: {
          connect: {
            id: inviter.id,
          },
        },
        expiresAt: invitation.expiresAt,
      },
    });
  }

  async joinGroupInvitation(joinGroupDto: JoinGroupInvitationDto) {
    const groupInvitationResult =
      await this.prisma.participantInvitations.findUnique({
        where: { id: joinGroupDto.invitationId },
      });

    const participantRegistered = await this.prisma.participants.findFirst({
      where: {
        userId: joinGroupDto.userId,
        groupId: groupInvitationResult.groupId,
      },
    });

    if (participantRegistered) {
      throw new ForbiddenException(
        'You are already a participant of this group',
      );
    }

    if (!groupInvitationResult) {
      throw new NotFoundException('Invitation not found.');
    }

    const groupInvitation = ParticipantInvitation.create(groupInvitationResult);

    if (groupInvitation.isExpired()) {
      throw new NotFoundException('Invitation expired.');
    }

    const participant = Participant.create(
      joinGroupDto.userId,
      groupInvitation.groupId,
    );

    return this.prisma.participants.create({
      data: {
        id: participant.id,
        user: { connect: { id: participant.userId } },
        group: { connect: { id: participant.groupId } },
      },
    });
  }
}
