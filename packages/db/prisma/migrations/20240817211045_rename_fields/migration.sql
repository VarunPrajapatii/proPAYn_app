/*
  Warnings:

  - You are about to drop the column `relatedUserId` on the `P2PLedger` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `P2PLedger` table. All the data in the column will be lost.
  - Added the required column `user_no` to the `P2PLedger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "P2PLedger" DROP CONSTRAINT "P2PLedger_relatedUserId_fkey";

-- DropForeignKey
ALTER TABLE "P2PLedger" DROP CONSTRAINT "P2PLedger_userId_fkey";

-- AlterTable
ALTER TABLE "P2PLedger" DROP COLUMN "relatedUserId",
DROP COLUMN "userId",
ADD COLUMN     "relatedUser_no" TEXT,
ADD COLUMN     "user_no" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "P2PLedger" ADD CONSTRAINT "P2PLedger_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "User"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PLedger" ADD CONSTRAINT "P2PLedger_relatedUser_no_fkey" FOREIGN KEY ("relatedUser_no") REFERENCES "User"("number") ON DELETE SET NULL ON UPDATE CASCADE;
