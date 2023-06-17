import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/services/user";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { albumId: string } }) {
  const currentUser: User | null = await getCurrentUser();

  try {
    const album = await prisma.album.findFirst({
      where: {
        id: params.albumId,
      },
    });

    if (!!album && album?.userId === currentUser?.id) {
      await prisma.post.updateMany({
        where: {
          albumId: params.albumId,
        },
        data: {
          albumId: null,
        },
      });

      await prisma.album.delete({
        where: {
          id: params.albumId,
        },
      });

      return NextResponse.json({ msg: "Album deleted succesfully!" });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
