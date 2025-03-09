-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);
