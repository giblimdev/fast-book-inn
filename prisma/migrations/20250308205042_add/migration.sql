-- AlterTable
ALTER TABLE "AccessibilityOption" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "AccommodationCharacteristic" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "BedType" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "BeddingConfiguration" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "ParkingOption" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "RoomFeature" ADD COLUMN     "order" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "order" INTEGER DEFAULT 0;
