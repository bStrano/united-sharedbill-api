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
}
