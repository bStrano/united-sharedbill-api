import { JWTPayload } from '@app/modules/auth/types/JWTPayload';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from '@app/config/envinronment/environment.service';
import { User } from '@app/modules/users/entities/user.entity';
import { PrismaService } from '@app/config/prisma/PrismaService';
import { v4 as uuid } from 'uuid';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly environmentService: EnvironmentService,
    private readonly jwtService: JwtService,
  ) {}

  async deleteSession(refreshToken: string) {
    await this.verifyRefreshToken(refreshToken);

    await this.prismaService.refreshTokens.delete({
      where: {
        token: refreshToken,
      },
    });
  }

  async verifyRefreshToken(refreshToken: string) {
    const token = await this.prismaService.refreshTokens.findUnique({
      where: {
        token: refreshToken,
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      return;
    }

    const user = this.jwtService.verify<JWTPayload>(refreshToken, {
      secret: this.environmentService.refreshTokenSecret,
    });

    if (!user) throw new ForbiddenException('Invalid token');

    if (token.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this session',
      );
    }

    return user;
  }

  async createSession(user: User) {
    const { accessToken, refreshToken } = this.generateTokens({
      email: user.email,
      id: user.id,
      name: user.name,
    });

    await this.prismaService.refreshTokens.create({
      data: {
        id: uuid(),
        token: refreshToken,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private generateTokens(payload: JWTPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: JWTPayload) {
    return this.jwtService.sign(payload, {
      secret: this.environmentService.accessTokenSecret,
      expiresIn: `${this.environmentService.accessTokenSecretExpireSeconds}s`,
    });
  }

  private generateRefreshToken(payload: JWTPayload) {
    return this.jwtService.sign(payload, {
      secret: this.environmentService.refreshTokenSecret,
      expiresIn: `${this.environmentService.refreshTokenSecretExpireSeconds}s`,
    });
  }

  async refreshSession(refreshToken: string) {
    const userPayload = await this.verifyRefreshToken(refreshToken);
    await this.deleteSession(refreshToken);
    const user = await this.prismaService.users.findUnique({
      where: {
        id: userPayload.id,
      },
    });
    return this.createSession(user);
  }
}
