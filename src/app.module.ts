import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';
import { EnvironmentService } from './config/envinronment/environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EnvironmentService],
})
export class AppModule {}
