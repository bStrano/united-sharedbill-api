import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@app/shared/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { ParticipantsService } from '@app/modules/groups/services/participants.service';
import { FindAllByGroup } from '@app/modules/groups/dto/participants/find-all-by-group';

@ApiTags('Groups Participants')
@Controller('groups/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get('/:groupId')
  findAll(@RequestUser() user: JWTPayload, @Param() params: FindAllByGroup) {
    return this.participantsService.findAllWithDebit(params.groupId, user.id);
  }
}
