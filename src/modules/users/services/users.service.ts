import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserWithOAuthDto } from '@app/modules/users/dtos/register-user';
import { PrismaService } from '@app/config/prisma/PrismaService';
import { v4 as uuid } from 'uuid';
import { User } from '@app/modules/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerFromOAuthProvider(
    registerUserWithOAuthDto: RegisterUserWithOAuthDto,
  ) {
    const user = await this.findByOauthId(registerUserWithOAuthDto.oauthId);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const userPrisma = await this.prisma.users.create({
      data: {
        id: uuid(),
        email: registerUserWithOAuthDto.email,
        name: registerUserWithOAuthDto.name,
        oauthId: registerUserWithOAuthDto.oauthId,
        providerId: registerUserWithOAuthDto.providerId,
        avatar: registerUserWithOAuthDto.avatar,
      },
    });
    return User.createFromPrisma(userPrisma);
  }

  async findByOauthId(oauthId: string) {
    const userPrisma = await this.prisma.users.findFirst({
      where: {
        oauthId,
      },
    });
    if (!userPrisma) return;
    return User.createFromPrisma(userPrisma);
  }
}
