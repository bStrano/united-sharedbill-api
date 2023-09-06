import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionDebtorsService } from './transaction-debtors.service';
import { CreateTransactionDebtorDto } from './dto/create-transaction-debtor.dto';
import { UpdateTransactionDebtorDto } from './dto/update-transaction-debtor.dto';

@Controller('transaction-debtors')
export class TransactionDebtorsController {
  constructor(
    private readonly transactionDebtorsService: TransactionDebtorsService,
  ) {}

  @Post()
  create(@Body() createTransactionDebtorDto: CreateTransactionDebtorDto) {
    return this.transactionDebtorsService.create(createTransactionDebtorDto);
  }

  @Get()
  findAll() {
    return this.transactionDebtorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionDebtorsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDebtorDto: UpdateTransactionDebtorDto,
  ) {
    return this.transactionDebtorsService.update(
      +id,
      updateTransactionDebtorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionDebtorsService.remove(+id);
  }
}
