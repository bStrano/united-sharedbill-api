import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './config/envinronment/environment.service';
import { validate } from './config/envinronment/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      validate: validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EnvironmentService],
})
export class AppModule {}
