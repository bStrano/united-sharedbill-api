import { Module } from '@nestjs/common';
import { EnvironmentService } from '@app/config/envinronment/environment.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
