"use client";
import { Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SyntheticEvent } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleGoogleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signIn("google", {
      redirect: false,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="h-[75vh] w-full flex items-center justify-center">
      <div className="border dark:border-muted border-neutral-100 shadow-sm flex flex-col items-center w-10/12 md:w-2/5 rounded-md">
        <div className="p-6 flex flex-col items-center">
          <Camera className="w-10 h-10" />
          <p className="text-2xl font-semibold font-zilla mt-1">Sign in to Shuttr</p>
          <p className="mt-2 text-sm dark:text-neutral-400 text-neutral-600">Start sharing your photographs.</p>
        </div>
        <Separator />
        <div className="p-6 w-full flex justify-center">
          <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
