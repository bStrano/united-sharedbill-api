import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { CreateExpenseDto } from '@app/modules/transactions/dto/create-expense.dto';
import { PrismaService } from '@app/config/prisma/PrismaService';
import { TransactionTypeEnum } from '../../../../libs/united-sharedbill-core/src/modules/transactions/enums/transaction-type.enum';
import { TransactionBuilder } from '@app/modules/transactions/builders/transaction.builder';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTransactionDto: CreateExpenseDto) {
    const group = await this.prismaService.groups.findFirst({
      where: {
        id: createTransactionDto.groupId,
      },
      include: {
        participants: true,
      },
    });

    if (!group) {
      throw new BadRequestException('Group not found');
    }

    if (
      !group.participants.some(
        (participant) => participant.userId === createTransactionDto.userId,
      )
    ) {
      throw new ForbiddenException('You are not a member of this group');
    }

    const transactionBuilder = new TransactionBuilder();
    transactionBuilder.withCommonFields(
      createTransactionDto.title,
      createTransactionDto.description,
      createTransactionDto.total,
      createTransactionDto.icon,
      createTransactionDto.groupId,
    );
    transactionBuilder.generateId();
    switch (createTransactionDto.transactionType) {
      case TransactionTypeEnum.EQUALLY:
        transactionBuilder.withDebtorsEquallyDivision(
          createTransactionDto.participants,
        );
        break;
      case TransactionTypeEnum.UNEQUALLY:
        transactionBuilder.withDebtorsUnequallyDivision(
          createTransactionDto.participants,
        );
        break;
      case TransactionTypeEnum.PERCENTAGE:
        transactionBuilder.withDebtorsPercentageDivision(
          createTransactionDto.participants,
        );
        break;
      case TransactionTypeEnum.EQUALLY_WITH_EXTRA_EXPENSES:
        transactionBuilder.withDebtorsExtraExpensesDivision(
          createTransactionDto.participants,
        );
        break;
      case TransactionTypeEnum.PARTS:
        transactionBuilder.withDebtorsPartsDivision(
          createTransactionDto.participants,
        );
        break;
      default:
        throw new BadRequestException('Invalid transaction type');
    }
    transactionBuilder.withOwners(createTransactionDto.owners);
    const transaction = transactionBuilder.build();
    const newTransaction = await this.prismaService.transactions.create({
      data: {
        id: transaction.id,
        title: transaction.title,
        description: transaction.description,
        icon: transaction.icon,
        total: transaction.total,
        isSettled: transaction.isSettled,
        group: {
          connect: {
            id: transaction.groupId,
          },
        },
        creator: {
          connect: {
            id: createTransactionDto.userId,
          },
        },
        owners: {
          create: transaction.owners.map((owner) => {
            return {
              participant: {
                connect: {
                  id: owner.participantId,
                },
              },
              total: owner.total,
            };
          }),
        },
        debtors: {
          create: transaction.debtors.map((debtor) => {
            return {
              participant: {
                connect: {
                  id: debtor.participantId,
                },
              },
              total: debtor.total,
            };
          }),
        },
      },
    });
    return newTransaction;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
