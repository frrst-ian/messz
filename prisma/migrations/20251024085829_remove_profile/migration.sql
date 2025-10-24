/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "pfpUrl" TEXT;

-- DropTable
DROP TABLE "public"."profile";
