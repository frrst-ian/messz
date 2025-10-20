/*
  Warnings:

  - You are about to drop the column `seen` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `unseenMessages` on the `conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "seen",
DROP COLUMN "unseenMessages";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;
