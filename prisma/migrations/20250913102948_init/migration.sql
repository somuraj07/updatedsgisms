-- CreateTable
CREATE TABLE "public"."Attendence" (
    "id" TEXT NOT NULL,
    "monthh" TEXT NOT NULL,
    "percentage" TEXT NOT NULL,
    "attendenceId" TEXT NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Attendence" ADD CONSTRAINT "Attendence_attendenceId_fkey" FOREIGN KEY ("attendenceId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
