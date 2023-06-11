import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const posts = await prisma?.post.findMany({
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
