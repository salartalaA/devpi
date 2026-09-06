"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import type { LoginData, RegisterData } from "@/schemas/auth.schema";

export async function registerUser(user: RegisterData) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return null;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: user.email,
        },
        {
          username: user.username,
        },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === user.email) {
      return {
        field: "email",
        message: "This email already exists!",
        success: false,
      };
    }

    return {
      field: "username",
      message: "This username already exists!",
      success: false,
    };
  }

  const salt = 12;

  const hashedPassword = await bcrypt.hash(user.password, salt);

  await prisma.user.create({
    data: {
      email: user.email,
      fullName: user.fullName,
      password: hashedPassword,
      username: user.username,
    },
  });
}

export async function loginUser(user: LoginData) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return null;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existingUser) {
    return {
      field: "email-validation",
      message: "Invalid credentials.",
      success: false,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return {
      field: "password-validation",
      message: "Invalid credentials.",
      success: false,
    };
  }

  const sessionId = crypto.randomUUID();

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      expiresAt: expires,
      id: sessionId,
      userId: existingUser.id,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", sessionId, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    success: true,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return null;
  }

  return session.user;
}

export async function logOutUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    cookieStore.delete("session");
  }

  redirect("/auth/login");
}
