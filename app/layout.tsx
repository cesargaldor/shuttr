import Navbar from "@/components/navbar";
import "./globals.css";
import { Manrope, Zilla_Slab } from "next/font/google";
import { getCurrentUser } from "@/services/user";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-zilla",
});

export const metadata = {
  title: "Shuttr - Your photography community.",
  description:
    "At Shuttr, we believe that photography is more than just a hobby or a job. It's a way of seeing the world and sharing your vision with others. We hope you'll join us on this journey of creativity, exploration, and community.",
};

export default async function RootLayout(props: any) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${manrope.variable} ${zilla.variable} font-sans`}>
        <Providers>
          <Navbar user={user} />
          <main className="w-full max-w-[90%] md:max-w-[70%] mx-auto my-6">{props.children}</main>
          {props.modal}
          <div className="border-t-2 border-muted mt-24">
            <Container>
              <Footer />
            </Container>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
