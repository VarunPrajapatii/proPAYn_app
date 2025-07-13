/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OnRampTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OnRampTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `OnRampTransaction` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[order_id]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference_number]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_token]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_number` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txn_id` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INIT', 'PENDING', 'SUCCESS', 'FAILED');

-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropIndex
DROP INDEX "OnRampTransaction_token_key";

-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "locked" SET DEFAULT 0,
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Balance_id_seq";

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_pkey",
DROP COLUMN "id",
DROP COLUMN "token",
ADD COLUMN     "bank_txn_id" TEXT,
ADD COLUMN     "completedTime" TIMESTAMP(3),
ADD COLUMN     "failure_reason" TEXT,
ADD COLUMN     "gateway_txn_id" TEXT,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "reference_number" TEXT NOT NULL,
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "txn_id" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("txn_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "PaymentSession" (
    "id" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "merchantTxnId" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "gateway_session_id" TEXT,
    "checkoutExpires" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'INIT',
    "callbackUrl" TEXT NOT NULL,
    "bank_session_id" TEXT,
    "bank_reference" TEXT,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankWebhook" (
    "id" SERIAL NOT NULL,
    "bank_session_id" TEXT NOT NULL,

    CONSTRAINT "BankWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSession_idempotencyKey_key" ON "PaymentSession"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSession_merchantTxnId_key" ON "PaymentSession"("merchantTxnId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSession_order_id_key" ON "PaymentSession"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSession_session_token_key" ON "PaymentSession"("session_token");

-- CreateIndex
CREATE INDEX "PaymentSession_status_createdAt_idx" ON "PaymentSession"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentSession_userId_idx" ON "PaymentSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BankWebhook_bank_session_id_key" ON "BankWebhook"("bank_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_order_id_key" ON "OnRampTransaction"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_reference_number_key" ON "OnRampTransaction"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_session_token_key" ON "OnRampTransaction"("session_token");

-- CreateIndex
CREATE INDEX "OnRampTransaction_userId_status_idx" ON "OnRampTransaction"("userId", "status");

-- CreateIndex
CREATE INDEX "OnRampTransaction_startTime_idx" ON "OnRampTransaction"("startTime");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
