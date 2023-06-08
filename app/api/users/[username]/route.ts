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

// export async function POST(request: Request) {
//   try {
//     const json = await request.json();

//     const user = await prisma.user.create({
//       data: json,
//     });

//     return new NextResponse(JSON.stringify(user), {
//      status: 201,
//      headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     if (error.code === "P2002") {
//       return new NextResponse("User with email already exists", {
//         status: 409,
//       });
//     }
//     return new NextResponse(error.message, { status: 500 });
//   }
// }
