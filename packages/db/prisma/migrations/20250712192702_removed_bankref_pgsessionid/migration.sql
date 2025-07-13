/*
  Warnings:

  - You are about to drop the column `bank_txn_id` on the `OnRampTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `bank_reference` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `gateway_session_id` on the `PaymentSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "bank_txn_id",
ADD COLUMN     "bank_session_id" TEXT;

-- AlterTable
ALTER TABLE "PaymentSession" DROP COLUMN "bank_reference",
DROP COLUMN "gateway_session_id";
