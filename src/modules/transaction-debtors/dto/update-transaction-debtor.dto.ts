import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDebtorDto } from './create-transaction-debtor.dto';

export class UpdateTransactionDebtorDto extends PartialType(
  CreateTransactionDebtorDto,
) {}
