import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "../lib/prisma";
import { notFound } from "next/navigation";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    return user;
  }

  return null;
}

export async function getUserProfile(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: {
        contains: username,
      },
    },
    include: {
      posts: true,
    },
  });

  if (user) {
    return user;
  } else {
    notFound();
  }
}
