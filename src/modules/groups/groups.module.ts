import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { PrismaModule } from '../../config/prisma/prisma.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [PrismaModule],
})
export class GroupsModule {}
