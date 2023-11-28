import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateExpenseDto } from '@app/modules/transactions/dto/create-expense.dto';
import { PrismaService } from '@app/config/prisma/PrismaService';
import { TransactionTypeEnum } from '../../../../libs/united-sharedbill-core/src/modules/transactions/enums/transaction-type.enum';
import { TransactionBuilder } from '@app/modules/transactions/builders/transaction.builder';
import { Group } from '@app/modules/groups/entities/group.entity';
import { TransactionTimelineSection } from '../../../../libs/united-sharedbill-core/src/modules/transactions/responses/timeline/transaction-timeline-section';
import { TransactionTimelineContent } from '../../../../libs/united-sharedbill-core/src/modules/transactions/responses/timeline/transaction-timeline-content';
import { TransactionInterface } from '../../../../libs/united-sharedbill-core/src/modules/transactions/entities/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTransactionDto: CreateExpenseDto) {
    const transaction =
      await this.createTransactionFromDto(createTransactionDto);
    return this.prismaService.transactions.create({
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
  }

  private async createTransactionFromDto(
    createTransactionDto: CreateExpenseDto,
  ) {
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
          createTransactionDto.debtors,
        );
        break;
      case TransactionTypeEnum.UNEQUALLY:
        transactionBuilder.withDebtorsUnequallyDivision(
          createTransactionDto.debtors,
        );
        break;
      case TransactionTypeEnum.PERCENTAGE:
        transactionBuilder.withDebtorsPercentageDivision(
          createTransactionDto.debtors,
        );
        break;
      case TransactionTypeEnum.EQUALLY_WITH_EXTRA_EXPENSES:
        transactionBuilder.withDebtorsExtraExpensesDivision(
          createTransactionDto.debtors,
        );
        break;
      case TransactionTypeEnum.PARTS:
        transactionBuilder.withDebtorsPartsDivision(
          createTransactionDto.debtors,
        );
        break;
      default:
        throw new BadRequestException('Invalid transaction type');
    }
    transactionBuilder.withOwners(createTransactionDto.owners);
    return transactionBuilder.build();
  }

  async findAllByGroup(
    userId: string,
    groupId: string,
    timezoneOffset: number,
  ): Promise<TransactionTimelineSection[]> {
    await this.checkPermission(groupId, userId);

    const data = await this.prismaService.transactions.findMany({
      include: {
        debtors: {
          include: {
            participant: {
              include: {
                user: true,
              },
            },
          },
        },
        owners: {
          include: {
            participant: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      where: {
        groupId,
      },
    });

    const groupedByDateMonth = new Map<string, TransactionInterface[]>();
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const dateWithOffset = new Date(date.getTime() - timezoneOffset * 60000);
      const key = `${dateWithOffset.getMonth()}-${dateWithOffset.getFullYear()}`;
      if (!groupedByDateMonth.has(key)) {
        groupedByDateMonth.set(key, []);
      }

      groupedByDateMonth.get(key).push(item as unknown as TransactionInterface);
    });
    return Array.from(groupedByDateMonth).map(([key, value]) => {
      return {
        key,
        month: key.split('-')[0],
        year: key.split('-')[1],
        data: value.map((item) => {
          const transactionTimelineContent: TransactionTimelineContent = {
            owners: item.owners.map((owner) => {
              return {
                name: owner.participant.user.name,
                amount: owner.total,
              };
            }),
            ownersCount: item.owners.length,
            userAmount:
              (item.debtors &&
                item.debtors.find(
                  (debtor) => debtor.participant.userId === userId,
                )?.total) ||
              0,
            createdAt: item.createdAt,
            icon: item.icon,
            id: item.id,
            isOwner: item.owners.some(
              (owner) => owner.participant.userId === userId,
            ),
            title: item.title,
            total: item.total,
          };
          return transactionTimelineContent;
        }),
      };
    });
  }

  private async checkPermission(groupId: string, userId: string) {
    const groupRaw = await this.prismaService.groups.findUnique({
      include: {
        participants: true,
      },
      where: {
        id: groupId,
      },
    });

    const group = Group.createFromPrisma(groupRaw);
    if (!group.isMember(userId)) {
      throw new ForbiddenException('You are not a member of this group');
    }
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prismaService.transactions.findUnique({
      include: {
        owners: {
          include: {
            participant: true,
          },
        },
        debtors: {
          include: {
            participant: true,
          },
        },
        group: true,
        creator: true,
      },
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    await this.checkPermission(transaction.group.id, userId);
    return transaction;
  }

  async update(id: string, updateTransactionDto: CreateExpenseDto) {
    const transaction = await this.createTransactionFromDto({
      ...updateTransactionDto,
    });
    return this.prismaService.transactions.update({
      where: {
        id,
      },
      data: {
        title: transaction.title,
        description: transaction.description,
        icon: transaction.icon,
        total: transaction.total,
        isSettled: transaction.isSettled,
        owners: {
          deleteMany: {
            participantId: {
              in: transaction.owners.map((owner) => owner.participantId),
            },
          },
          createMany: {
            data: transaction.owners.map((owner) => {
              return {
                participantId: owner.participantId,
                total: owner.total,
              };
            }),
          },
        },
        debtors: {
          deleteMany: {
            participantId: {
              in: transaction.owners.map((owner) => owner.participantId),
            },
          },
          createMany: {
            data: transaction.debtors.map((debtor) => {
              return {
                participantId: debtor.participantId,
                total: debtor.total,
              };
            }),
          },
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    const transaction = await this.prismaService.transactions.findUnique({
      where: {
        id,
      },
    });

    await this.checkPermission(transaction.groupId, userId);

    return this.prismaService.transactions.delete({
      where: {
        id,
      },
    });
  }
}
