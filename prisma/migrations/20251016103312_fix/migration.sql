/*
  Warnings:

  - You are about to drop the column `converstationId` on the `message` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_converstationId_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "converstationId",
ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
