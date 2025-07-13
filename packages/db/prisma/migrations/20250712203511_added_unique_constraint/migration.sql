/*
  Warnings:

  - A unique constraint covering the columns `[callbackIdempotencyKey]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BankWebhook" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_callbackIdempotencyKey_key" ON "OnRampTransaction"("callbackIdempotencyKey");
