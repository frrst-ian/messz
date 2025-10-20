/*
  Warnings:

  - You are about to drop the column `pfp` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "pfp",
ADD COLUMN     "pfpUrl" TEXT;
