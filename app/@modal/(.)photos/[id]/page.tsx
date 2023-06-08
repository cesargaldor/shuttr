import PhotoModal from "@/components/photo-modal";
import { photos } from "@/mock/images";

interface Params {
  params: {
    id: string;
  };
}

export default function PhotoDetail({ params }: Params) {
  const photo = photos.find((p) => p.id === params.id);

  return (
    <PhotoModal>
      {/* <Photo photo={photo} /> */}

      <img
        className="block rounded-lg object-fit w-full h-auto"
        src={photo?.imageSrc}
        alt="alt"
      />
    </PhotoModal>
  );
}
