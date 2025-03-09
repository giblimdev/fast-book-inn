-- CreateTable
CREATE TABLE "_HotelToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_HotelToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_HotelToUser_B_index" ON "_HotelToUser"("B");

-- AddForeignKey
ALTER TABLE "_HotelToUser" ADD CONSTRAINT "_HotelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelToUser" ADD CONSTRAINT "_HotelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
