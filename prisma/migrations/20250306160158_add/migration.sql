-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT DEFAULT '',
ADD COLUMN     "phoneVerified" BOOLEAN DEFAULT false;
