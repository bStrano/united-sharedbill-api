import { PrismaService } from '@app/config/prisma/PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionDebtorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get the list of debtors for a specific user in a group. People who the user owe money.
   */
  async getListOfParticipantsUserOwe(ownerId: string, groupId: string) {
    return this.prismaService.$queryRaw<UserDebtorsSummaryInterface[]>`
            SELECT SUM(AGGREGATE.total) as total, AGGREGATE."participantId" as "participantId"
            FROM (SELECT DISTINCT TB.total, TB."participantId", TB."transactionId"
                  FROM "TransactionDebtors" TB
                           JOIN "Transactions" T ON TB."transactionId" = T.id
                           JOIN "TransactionOwners" TraOwn ON T.id = TraOwn."transactionId"
                           JOIN "Participants" P ON TraOwn."participantId" = P.id
                           JOIN "Participants" PT ON TB."participantId" = P.id
                           JOIN "Users" OwnerUser ON P."userId" = OwnerUser.id
                           JOIN "Users" DebtorUser ON PT."userId" = DebtorUser.id
                  WHERE OwnerUser.id != ${ownerId}
                    and P."groupId" = ${groupId}
                    and DebtorUser.id = ${ownerId}) AS AGGREGATE
            GROUP BY AGGREGATE."participantId";;
        `;
  }

  /**
   * Get the list of debtors for a specific user in a group. People who owe the user money.
   */
  async getListOfParticipantsOweUser(ownerId: string, groupId: string) {
    console.log('ownerId', ownerId);
    console.log('groupId', groupId);
    return this.prismaService.$queryRaw<UserDebtorsSummaryInterface[]>`
        SELECT SUM(TB.total) as total, TB."participantId"
        FROM "TransactionDebtors" TB
               JOIN "Transactions" T ON TB."transactionId" = T.id
               JOIN "TransactionOwners" TraOwn ON T.id = TraOwn."transactionId"
               JOIN "Participants" P ON TraOwn."participantId" = P.id
               JOIN "Users" U ON P."userId" = U.id
        WHERE U.id = ${ownerId}
          and P."groupId" = ${groupId}
        GROUP BY TB."participantId";
        `;
  }
}

export interface UserDebtorsSummaryInterface {
  total: number;
  participantId: string;
}
