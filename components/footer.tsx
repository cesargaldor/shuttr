import Link from "next/link";
import { Separator } from "./ui/separator";
import { Camera } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5">
          <div className="font-zilla text-2xl flex items-center gap-1">
            <Camera className="w-8 h-8 md:w-6 md:h-6" /> <span>SHUTTR</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold mt-2">
            <Link href="/">About</Link>
            <Link href="/">Blog</Link>
          </div>
        </div>
        <div className="w-full md:w-2/5 mt-6 md:mt-0">
          <p className="text-sm">Join our newsletter</p>
          <div className="flex items-center gap-4 mt-2">
            <Input
              placeholder="Enter your email"
              className="bg-white"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="py-8"></div>
      <div className="flex items-center justify-between text-xs font-semibold">
        <div>&copy; {new Date().getFullYear()}</div>
        <div className="flex items-center gap-6">
          <Link href="/">Privacy</Link>
          <Link href="/blog">Terms</Link>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
