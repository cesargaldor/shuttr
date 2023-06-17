import prisma from "../lib/prisma";

export async function getUserAlbums(userId: string) {
  return await prisma.album.findMany({
    where: {
      userId,
    },
    include: {
      images: true,
    },
  });
}
