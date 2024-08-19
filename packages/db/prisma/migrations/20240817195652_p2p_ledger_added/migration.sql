-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('Credit', 'Debit');

-- CreateTable
CREATE TABLE "P2PLedger" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionType" "LedgerType" NOT NULL,
    "relatedUserId" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "P2PLedger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2PLedger" ADD CONSTRAINT "P2PLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PLedger" ADD CONSTRAINT "P2PLedger_relatedUserId_fkey" FOREIGN KEY ("relatedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
