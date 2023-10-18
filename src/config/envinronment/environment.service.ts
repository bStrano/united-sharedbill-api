import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Environment } from './environment.config';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get nodeEnv(): Environment {
    return this.configService.get<Environment>('NODE_ENV');
  }

  get accessTokenSecret(): string {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET');
  }

  get accessTokenSecretExpireSeconds(): number {
    return this.configService.get<number>('ACCESS_TOKEN_SECRET_EXPIRE_SECONDS');
  }

  get refreshTokenSecret(): string {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }

  get refreshTokenSecretExpireSeconds(): number {
    return this.configService.get<number>(
      'REFRESH_TOKEN_SECRET_EXPIRE_SECONDS',
    );
  }
}
