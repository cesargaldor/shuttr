import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "../lib/prisma";

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
