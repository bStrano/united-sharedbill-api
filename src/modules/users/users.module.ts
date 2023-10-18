import { Module } from '@nestjs/common';
import { UsersControllers } from '@app/modules/users/controllers/users.controllers';
import { UsersService } from '@app/modules/users/services/users.service';
import { PrismaModule } from '@app/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersControllers],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
