import { getCurrentUser } from "@/services/user";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const currentUser: User | null = await getCurrentUser();

  try {
    const newAlbum = await prisma?.album.create({
      data: {
        userId: currentUser?.id,
        ...body,
      },
    });

    return NextResponse.json(newAlbum);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
