"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

const RatioNextImage = ({ src, alt }: Props) => {
  const [ratio, setRatio] = useState(16 / 9); // this value can be anything by default, could be 1 if you want a square
  return (
    <Image
      alt={alt}
      src={src}
      className="w-full"
      width={0}
      height={2200 / ratio}
      onLoadingComplete={({ naturalWidth, naturalHeight }) => {
        setRatio(naturalWidth / naturalHeight);
      }}
    />
  );
};
export default RatioNextImage;
