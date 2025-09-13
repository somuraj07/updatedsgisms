-- CreateTable
CREATE TABLE "public"."Timetabel" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "semsister" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timetabel_pkey" PRIMARY KEY ("id")
);
