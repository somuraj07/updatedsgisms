/*
  Warnings:

  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Role" ADD VALUE 'WARDEN';
ALTER TYPE "public"."Role" ADD VALUE 'WATCHMAN';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Hostel" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "submit" BOOLEAN NOT NULL DEFAULT false,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "comeoutTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comeinTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostelId" TEXT NOT NULL,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Hostel" ADD CONSTRAINT "Hostel_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
