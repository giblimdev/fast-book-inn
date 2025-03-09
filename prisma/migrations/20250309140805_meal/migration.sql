-- CreateTable
CREATE TABLE "MealPlans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MealPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HotelToMealPlans" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HotelToMealPlans_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_HotelToMealPlans_B_index" ON "_HotelToMealPlans"("B");

-- AddForeignKey
ALTER TABLE "_HotelToMealPlans" ADD CONSTRAINT "_HotelToMealPlans_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelToMealPlans" ADD CONSTRAINT "_HotelToMealPlans_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
