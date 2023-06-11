import { getCurrentUser } from "@/services/user";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser: User | null = await getCurrentUser();

  try {
    const updatedUser = await prisma?.user.update({
      where: {
        email: currentUser?.email as string,
      },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
