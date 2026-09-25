-- CreateTable
CREATE TABLE "Sensors" (
    "id" BIGSERIAL NOT NULL,
    "TDS" INTEGER,
    "SuhuAir" INTEGER,
    "pH" INTEGER,
    "Cuaca" BOOLEAN,
    "DateTime" TEXT,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("id")
);
