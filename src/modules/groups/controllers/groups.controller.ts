import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { GroupsService } from '../services/groups.service';
import { v4 as uuidv4 } from 'uuid';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(
    @RequestUser() user: JWTPayload,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.groupsService.create({
      id: uuidv4().toString(),
      title: createGroupDto.title,
      description: createGroupDto.description,
      icon: createGroupDto.icon,
      owner: {
        connect: {
          id: user.userId,
        },
      },
      participants: {
        createMany: {
          data: [
            {
              id: uuidv4().toString(),
              userId: user.userId,
            },
          ],
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.groupsService.find({
      id: id,
    });
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.groupsService.deleteById(id);
  }
}
