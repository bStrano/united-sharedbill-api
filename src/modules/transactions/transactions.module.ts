import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';
import { PrismaModule } from '@app/config/prisma/prisma.module';
import { TransactionDebtorsRepository } from '@app/modules/transactions/repositories/transaction-debtors.repository';
import { TransactionsDebtorsController } from '@app/modules/transactions/controllers/transactions-debtors.controller';
import { TransactionDebtorsService } from '@app/modules/transactions/services/transaction-debtors.service';
import { ParticipantsRepository } from '@app/modules/transactions/repositories/participants.repository';

@Module({
  controllers: [TransactionsController, TransactionsDebtorsController],
  providers: [
    TransactionsService,
    TransactionDebtorsRepository,
    TransactionDebtorsService,
    ParticipantsRepository,
  ],
  imports: [PrismaModule],
  exports: [TransactionsService, TransactionDebtorsService],
})
export class TransactionsModule {}
