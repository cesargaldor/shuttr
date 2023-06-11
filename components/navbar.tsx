"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { FC, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import { BASE_URL } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface Props {
  user: any;
}

const Navbar: FC<Props> = ({ user }) => {
  return (
    <nav className="w-full h-20 bg-white flex items-center">
      <div className="flex items-center justify-between w-full max-w-[90%] md:max-w-[70%] mx-auto">
        <Link href={BASE_URL}>
          <div className="font-zilla text-2xl flex items-center gap-1">
            <Camera className="w-8 h-8 md:w-6 md:h-6" /> <span className="hidden md:block">SHUTTR</span>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="">
                <NavigationMenuTrigger className="">Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2 md:w-[200px] lg:w-[200px] lg:grid-cols-1">
                    <ListItem
                      href={`${BASE_URL}/latest`}
                      title="Latest photos"
                    />

                    <ListItem
                      href="/"
                      title="Categories"
                    />

                    <ListItem
                      href="/"
                      title="Artists"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/blog"
                  legacyBehavior
                  passHref>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Blog</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/p/${user?.email?.split("@")[0]}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
                    })
                  }>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="-ml-1">
              <Link href={`${BASE_URL}/login`}>Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
