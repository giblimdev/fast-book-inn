/*
  Warnings:

  - You are about to drop the column `hostId` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "hostId",
ADD COLUMN     "userId" TEXT NOT NULL;
