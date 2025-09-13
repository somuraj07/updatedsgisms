import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

interface Context {
  params: { id: string };
}

export async function GET(req: Request, context: Context) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
  }

  try {
    const attendance = await prisma.attendence.findMany({
      where: {
        attendenceId: id, 
      },
    });

    if (!attendance || attendance.length === 0) {
      return NextResponse.json({ error: "No attendance found" }, { status: 404 });
    }

    return NextResponse.json(attendance);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}
