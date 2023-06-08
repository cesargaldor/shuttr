import Footer from "@/components/footer";
import Masonry from "@/components/masonry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center mt-10 md:mt-20">
        <Badge
          variant="secondary"
          className="w-fit">
          Join now. It's free
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mt-8 font-zilla text-center">Discover. Share. Inspire.</h1>
        <h2 className="mt-3 text-xl md:text-3xl text-center">Join the community where passionate photographers gather.</h2>
        <Button className="mt-6 group">
          <Link
            href={`${BASE_URL}/login`}
            className="flex items-center">
            Get started <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all" />
          </Link>
        </Button>
        {/* <div className="relative aspect-video w-full h-[20%] mt-12">
          <Image
            src="https://images.unsplash.com/photo-1685216779685-1c457bda18d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="cover-photo"
            fill
            className="object-cover rounded-md"
          />
        </div> */}
        <div className="mt-16">
          <Masonry />
        </div>
      </div>
    </div>
  );
}
