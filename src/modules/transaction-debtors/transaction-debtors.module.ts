import { Module } from '@nestjs/common';
import { TransactionDebtorsService } from './transaction-debtors.service';
import { TransactionDebtorsController } from './transaction-debtors.controller';

@Module({
  controllers: [TransactionDebtorsController],
  providers: [TransactionDebtorsService],
})
export class TransactionDebtorsModule {}
