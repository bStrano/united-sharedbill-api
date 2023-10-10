import { PartialType } from '@nestjs/swagger';
import { CreateExpenseDto } from '@app/modules/transactions/dto/create-expense.dto';

export class UpdateTransactionDto extends PartialType(CreateExpenseDto) {}
