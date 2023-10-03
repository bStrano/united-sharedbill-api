/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `TransactionDebtors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_ownerId_fkey";

-- AlterTable
ALTER TABLE "TransactionDebtors" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "ownerId",
ADD COLUMN     "participantsId" TEXT;

-- CreateTable
CREATE TABLE "TransactionOwners" (
    "participantId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "total" DOUBLE PRECISION,

    CONSTRAINT "TransactionOwners_pkey" PRIMARY KEY ("participantId","transactionId")
);

-- AddForeignKey
ALTER TABLE "TransactionDebtors" ADD CONSTRAINT "TransactionDebtors_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionOwners" ADD CONSTRAINT "TransactionOwners_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionOwners" ADD CONSTRAINT "TransactionOwners_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_participantsId_fkey" FOREIGN KEY ("participantsId") REFERENCES "Participants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
