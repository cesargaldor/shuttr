"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  children: JSX.Element;
}

const PhotoModal: FC<Props> = ({ children }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: any) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 inset-0 mx-auto bg-black/60"
      onClick={onClick}>
      <div
        ref={wrapper}
        className="fixed z-40 inset-10 overflow-y-scroll rounded-md">
        <div className="bg-white w-full">
          <div className="flex w-full justify-end p-12">
            <X
              className="w-6 h-6 cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4/12 rounded-md">{children}</div>
            <div className="w-full bg-neutral-50 mt-12">
              <div className="w-5/12 mx-auto grid grid-cols-3 p-12 gap-4">
                <div className="pl-6">
                  <p className="mb-2 text-lg font-zilla">Uploaded by</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>César Gálvez</span>
                  </div>
                </div>

                <div className="pl-6">
                  <p className="mb-2 text-lg font-zilla">Location</p>
                  <span>Sevilla, España</span>
                </div>

                <div className="pl-6">
                  <p className="mb-2 text-lg font-zilla">Published</p>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                <div className="mt-4 pl-6">
                  <p className="mb-2 text-lg font-zilla">EXIF</p>
                  <span>F12 - 1/400s - ISO 160</span>
                </div>

                <div className="mt-4 pl-6">
                  <p className="mb-2 text-lg font-zilla">Camera</p>
                  <span>Sony A6100</span>
                </div>

                <div className="mt-4 pl-6">
                  <p className="mb-2 text-lg font-zilla">Focal length</p>
                  <span>30mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
