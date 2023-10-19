import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { SessionService } from '@app/modules/auth/services/session.service';
import { UsersModule } from '@app/modules/users/users.module';
import { PrismaModule } from '@app/config/prisma/prisma.module';
import { EnvironmentModule } from '@app/config/envinronment/envinronment.module';
import { SessionController } from '@app/modules/auth/controllers/session.controller';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    EnvironmentModule,
    UsersModule,
    JwtModule.register({}),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    SessionService,
  ],
  controllers: [AuthController, SessionController],
})
export class AuthModule {}
