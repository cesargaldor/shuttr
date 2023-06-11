import { getCurrentUser } from "@/services/user";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser: User | null = await getCurrentUser();

  try {
    const newPost = await prisma?.post.create({
      data: {
        userId: currentUser?.id,
        ...body,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
