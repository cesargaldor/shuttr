import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
