/*
  Warnings:

  - You are about to drop the column `description` on the `MealPlans` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `MealPlans` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `MealPlans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MealPlans" DROP COLUMN "description",
DROP COLUMN "isActive",
DROP COLUMN "price",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
