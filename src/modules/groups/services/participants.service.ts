import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from '../dto/participants/create-participant.dto';
import { UpdateParticipantDto } from '../dto/participants/update-participant.dto';
import { PrismaService } from '@app/config/prisma/PrismaService';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return 'This action adds a new participant';
  }

  findAll() {
    return `This action returns all participants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
