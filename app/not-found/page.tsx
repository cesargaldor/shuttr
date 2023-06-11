import { Button } from "@/components/ui/button";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div>
      <div className="h-[60vh] w-full flex flex-col justify-center items-center">
        <div className="bg-muted px-4 py-2 text-lg rounded-md mb-4">Page Not Found</div>
        <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
        <Button className="mt-6">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
