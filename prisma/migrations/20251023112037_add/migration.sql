/*
  Warnings:

  - You are about to drop the column `participantId` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `conversation` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversation" DROP CONSTRAINT "conversation_participantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversation" DROP CONSTRAINT "conversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_senderId_fkey";

-- DropIndex
DROP INDEX "public"."conversation_userId_participantId_key";

-- AlterTable
ALTER TABLE "conversation" DROP COLUMN "participantId",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "public"."Profile";

-- CreateTable
CREATE TABLE "conversation_participant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "conversation_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "pfpUrl" TEXT,
    "bio" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conversation_participant_userId_conversationId_key" ON "conversation_participant"("userId", "conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
