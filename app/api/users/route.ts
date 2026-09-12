import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      fullName: true,
      id: true,
      username: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();

  const salt = 12;

  const hashPassword = await bcrypt.hash(body.password, salt);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json(
      { message: "User already exists!" },
      { status: 500 }
    );
  }

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      fullName: body.fullName,
      password: hashPassword,
      username: body.username,
    },
    select: {
      email: true,
      fullName: true,
      id: true,
      username: true,
    },
  });

  return NextResponse.json(newUser, { status: 200 });
}
