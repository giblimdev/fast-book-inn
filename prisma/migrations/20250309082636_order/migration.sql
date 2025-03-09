/*
  Warnings:

  - Made the column `order` on table `AccessibilityOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `AccommodationCharacteristic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `AccommodationType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `BedType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `BeddingConfiguration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Label` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `ParkingOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Room` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `RoomFeature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Tax` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emailVerified` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneVerified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AccessibilityOption" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "AccommodationCharacteristic" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "AccommodationType" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "BedType" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "BeddingConfiguration" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Destination" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Label" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "ParkingOption" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "RoomFeature" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tax" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phoneVerified" SET NOT NULL;
