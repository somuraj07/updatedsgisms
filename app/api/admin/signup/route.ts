import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const users = await request.json(); // array of users

    if (!Array.isArray(users)) {
      return NextResponse.json({ message: "Expected an array of users" }, { status: 400 });
    }

    const createdUsers = [];

    for (const body of users) {
      const { email, password, role, name, department } = body;

      if (!name || !email || !password || !role || !department) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) continue; // skip duplicates

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, role, department, password: hashedPassword }
      });

      createdUsers.push(user);
    }

    return NextResponse.json({ message: "Users created successfully", users: createdUsers }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
