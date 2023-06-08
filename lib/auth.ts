import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
    // CredentialsProvider({
    //   type: "credentials",
    //   credentials: {},
    //   //@ts-ignore
    //   async authorize(credentials) {
    //     const { email, password } = credentials as {
    //       email: string;
    //       password: string;
    //     };

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email,
    //       },
    //     });

    //     if (user) {
    //       const match = await bcrypt.compare(password, user.password as string);

    //       if (match) {
    //         return user;
    //       } else {
    //         throw new Error("Credenciales inválidas");
    //       }
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
  },
};
