/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('PUBLIC_BOARD', 'PRIVATE_GROUP', 'DIRECT_MESSAGE');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "timestamp",
DROP COLUMN "userId",
ADD COLUMN     "editedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "replyToId" TEXT,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL,
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMember" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT,

    CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Room_type_idx" ON "Room"("type");

-- CreateIndex
CREATE INDEX "Room_isPublic_idx" ON "Room"("isPublic");

-- CreateIndex
CREATE INDEX "RoomMember_userId_idx" ON "RoomMember"("userId");

-- CreateIndex
CREATE INDEX "RoomMember_roomId_idx" ON "RoomMember"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomMember_roomId_userId_key" ON "RoomMember"("roomId", "userId");

-- CreateIndex
CREATE INDEX "Message_roomId_sentAt_idx" ON "Message"("roomId", "sentAt" DESC);

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_replyToId_idx" ON "Message"("replyToId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
