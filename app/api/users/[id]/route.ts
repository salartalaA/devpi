import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    select: {
      email: true,
      fullName: true,
      id: true,
      username: true,
    },
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User does not exists!" },
      { status: 404 }
    );
  }

  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const deletedUser = await prisma.user.delete({
    select: {
      email: true,
      fullName: true,
      id: true,
      username: true,
    },
    where: {
      id,
    },
  });

  if (!deletedUser) {
    return NextResponse.json(
      { message: "User does not exists!" },
      { status: 404 }
    );
  }

  return NextResponse.json(deletedUser, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const salt = 12;

  const hashedPassword = await bcrypt.hash(body.password, salt);

  const updatedUser = await prisma.user.update({
    data: {
      email: body.email,
      fullName: body.fullName,
      password: hashedPassword,
      username: body.username,
    },
    select: {
      email: true,
      fullName: true,
      id: true,
      password: true,
      username: true,
    },
    where: {
      id,
    },
  });

  if (!updatedUser) {
    return NextResponse.json({ message: "OOps" }, { status: 500 });
  }

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const salt = 12;

  const hashedPassword = await bcrypt.hash(body.password, salt);

  const updatedUser = await prisma.user.update({
    data: {
      email: body.email,
      fullName: body.fullName,
      password: hashedPassword,
      username: body.username,
    },
    select: {
      email: true,
      fullName: true,
      id: true,
      username: true,
    },
    where: {
      id,
    },
  });

  if (!updatedUser) {
    return NextResponse.json({ message: "OOps" }, { status: 500 });
  }

  return NextResponse.json(updatedUser, { status: 200 });
}
