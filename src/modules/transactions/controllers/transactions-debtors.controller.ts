import { Controller, Get, Query } from '@nestjs/common';
import { TransactionDebtorsService } from '@app/modules/transactions/services/transaction-debtors.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@app/modules/auth/decorators/public-route.decorator';

@ApiTags('Transactions Debtors')
@Public()
@Controller('transactions/debtors')
export class TransactionsDebtorsController {
  constructor(
    private readonly transactionDebtorsService: TransactionDebtorsService,
  ) {}

  @Get('group')
  async getParticipantListDebtors(
    @Query('ownerId') ownerId: string,
    @Query('groupId') groupId: string,
  ) {
    return this.transactionDebtorsService.getListOfParticipantsOweUser(
      ownerId,
      groupId,
    );
  }
}
