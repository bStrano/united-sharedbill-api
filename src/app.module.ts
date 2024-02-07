import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './config/envinronment/environment.service';
import { validate } from './config/envinronment/environment.config';
import { GroupsModule } from './modules/groups/groups.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionDebtorsModule } from './modules/transaction-debtors/transaction-debtors.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      validate: validate,
    }),
    AuthModule,
    GroupsModule,
    TransactionDebtorsModule,
    TransactionsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvironmentService],
})
export class AppModule {}
