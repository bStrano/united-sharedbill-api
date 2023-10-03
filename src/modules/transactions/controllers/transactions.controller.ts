import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { CreateExpenseDto } from '@app/modules/transactions/dto/create-expense.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@app/modules/auth/decorators/request-user.decorator';
import { JWTPayload } from '@app/modules/auth/types/JWTPayload';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @RequestUser() user: JWTPayload,
    @Body() createTransactionDto: CreateExpenseDto,
  ) {
    return this.transactionsService.create({
      ...createTransactionDto,
      userId: user.userId,
    });
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
