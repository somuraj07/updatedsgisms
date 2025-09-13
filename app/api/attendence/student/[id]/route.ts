// app/api/attendence/student/[id]/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Record<string, string> }) {
  const { params } = context;
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
  }

  try {
    const attendance = await prisma.attendence.findMany({
      where: { attendenceId: id }, // make sure the type matches your Prisma schema
    });

    if (!attendance || attendance.length === 0) {
      return NextResponse.json({ error: "No attendance found" }, { status: 404 });
    }

    return NextResponse.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
