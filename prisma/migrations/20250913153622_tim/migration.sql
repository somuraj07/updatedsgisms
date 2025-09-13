/*
  Warnings:

  - A unique constraint covering the columns `[department,year,semsister]` on the table `Timetabel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Timetabel_department_year_semsister_key" ON "public"."Timetabel"("department", "year", "semsister");
