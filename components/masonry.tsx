import Image from "next/image";
import RatioNextImage from "./ratio-image";
import { photos } from "@/mock/images";
import Link from "next/link";

const Masonry = () => {
  // https://source.unsplash.com/random/?city,night
  return (
    <div className="columns-2 md:columns-3 gap-4">
      {photos.map((p) => {
        return (
          <Link
            key={p.id}
            href={`/photos/${p.id}`}>
            <img
              className="h-auto max-w-full rounded-lg mb-4"
              src={p.imageSrc}
              alt="alt"
              loading="lazy"
            />
          </Link>
        );
      })}
      {/* <div className="w-full h-full relative">
          <RatioNextImage
            src="https://source.unsplash.com/user/wsanter"
            alt="photo"
          />
        </div> */}

      {/* <RatioNextImage
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
          alt="photo"
        />

        <RatioNextImage
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
          alt="photo"
        /> */}

      {/* <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
        alt=""
      />

      <img
        className="h-auto max-w-full rounded-lg mb-4"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
        alt=""
      /> */}
    </div>
  );
};

export default Masonry;
