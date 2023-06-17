import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    let posts;
    const albumId: string | null = request.nextUrl.searchParams.get("album");

    if (albumId) {
      posts = await prisma?.post.findMany({
        where: {
          userId: params.userId,
          albumId,
        },
      });
    } else {
      posts = await prisma?.post.findMany({
        where: {
          userId: params.userId,
        },
      });
    }

    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
