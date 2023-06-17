import PhotoModal from "@/components/photo-modal";
import { getPhotoById } from "@/services/post";
import { ExtendedPost } from "@/types/ExtendedPost";

interface Params {
  params: {
    id: string;
  };
}

export default async function PhotoDetail({ params }: Params) {
  const post = (await getPhotoById(params?.id)) as ExtendedPost;

  return (
    <PhotoModal post={post}>
      <img
        className="block rounded-lg object-fit w-full h-full md:h-auto"
        src={post?.image}
        alt="alt"
        loading="lazy"
      />
    </PhotoModal>
  );
}
