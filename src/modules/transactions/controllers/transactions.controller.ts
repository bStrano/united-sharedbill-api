import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateExpenseDto } from '@app/modules/transactions/dto/create-expense.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@app/shared/decorators/request-user.decorator';
import { JWTPayload } from '@app/modules/auth/types/JWTPayload';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt-auth.guard';
import { FindAllByGroupDto } from '@app/modules/transactions/dto/find-all-by-group.dto';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

  @Get('/group/:groupId')
  findAll(@RequestUser() user: JWTPayload, @Param() params: FindAllByGroupDto) {
    return this.transactionsService.findAllByGroup(user.userId, params.groupId);
  }

  @Get(':id')
  findOne(@RequestUser() user: JWTPayload, @Param('id') id: string) {
    return this.transactionsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @RequestUser() user: JWTPayload,
    @Param('id') id: string,
    @Body() updateTransactionDto: CreateExpenseDto,
  ) {
    return this.transactionsService.update(id, {
      ...updateTransactionDto,
      userId: user.userId,
    });
  }

  @Delete(':id')
  remove(@RequestUser() user: JWTPayload, @Param() id: string) {
    return this.transactionsService.remove(user.userId, id);
  }
}
