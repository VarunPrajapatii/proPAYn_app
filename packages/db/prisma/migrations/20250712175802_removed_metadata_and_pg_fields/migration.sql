/*
  Warnings:

  - You are about to drop the column `ip_address` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `PaymentSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentSession" DROP COLUMN "ip_address",
DROP COLUMN "user_agent";
