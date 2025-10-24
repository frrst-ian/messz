/*
  Warnings:

  - The primary key for the `conversation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `conversation_participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."conversation_participant" DROP CONSTRAINT "conversation_participant_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversation_participant" DROP CONSTRAINT "conversation_participant_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "conversation" DROP CONSTRAINT "conversation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "conversation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "conversation_id_seq";

-- AlterTable
ALTER TABLE "conversation_participant" DROP CONSTRAINT "conversation_participant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "conversationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "conversation_participant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "conversation_participant_id_seq";

-- AlterTable
ALTER TABLE "message" DROP CONSTRAINT "message_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "senderId" SET DATA TYPE TEXT,
ALTER COLUMN "conversationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "message_id_seq";

-- AlterTable
ALTER TABLE "profile" DROP CONSTRAINT "profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "profile_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
