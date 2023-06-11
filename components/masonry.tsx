import { photos as MockPhotos } from "@/mock/images";
import Link from "next/link";
import { FC } from "react";

interface Props {
  photos?: any[] | null;
}

const Masonry: FC<Props> = ({ photos }) => {
  if (photos) {
    return (
      <div className="columns-2 md:columns-3 gap-4">
        {photos?.map((p) => {
          return (
            <Link
              key={p.id}
              href={`/photos/${p.id}`}>
              <img
                className="h-auto max-w-full rounded-lg mb-4 relative"
                src={p.image}
                alt={p.title}
                loading="lazy"
              />

              {/* <div
                style={{ backgroundImage: `url(${p.image})` }}
                className="bg-cover bg-no-repeat bg-center relative max-w-full h-[864px] rounded-md">
                <div className="absolute bottom-5 left-5 text-xl text-white font-semibold">
                  <p>ISO 100</p>
                  <p>F/7.1</p>
                  <p>1/800s</p>
                </div>
              </div> */}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 gap-4">
      {MockPhotos.map((p) => {
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
    </div>
  );
};

export default Masonry;
