import { Injectable } from '@nestjs/common';
import { CreateTransactionDebtorDto } from './dto/create-transaction-debtor.dto';
import { UpdateTransactionDebtorDto } from './dto/update-transaction-debtor.dto';

@Injectable()
export class TransactionDebtorsService {
  create(createTransactionDebtorDto: CreateTransactionDebtorDto) {
    return 'This action adds a new transactionDebtor';
  }

  findAll() {
    return `This action returns all transactionDebtors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionDebtor`;
  }

  update(id: number, updateTransactionDebtorDto: UpdateTransactionDebtorDto) {
    return `This action updates a #${id} transactionDebtor`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionDebtor`;
  }
}
