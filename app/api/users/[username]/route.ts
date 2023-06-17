//import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  //const users = await prisma.user.findMany();
  const users = [
    {
      name: "César",
      username: "cesar",
    },
    {
      name: "Lidia",
      username: "lidia",
    },
  ];

  const user = users.find((u) => u.username === params.username);

  if (!user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(user);
}
