import AlbumSlider from "@/components/album-slider";
import Masonry from "@/components/masonry";
import { getUserAlbums } from "@/services/album";
import { getUserPhotos } from "@/services/post";
import { ExtendedAlbum } from "@/types/ExtendedAlbum";
import { Post, User } from "@prisma/client";
import { FC } from "react";

interface Props {
  user: User;
  albumId: string | undefined | null;
}

const UserGallery: FC<Props> = async ({ user, albumId }) => {
  const photos = (await getUserPhotos(user?.id, albumId)) as Post[];
  const albums = (await getUserAlbums(user?.id)) as ExtendedAlbum[];

  return (
    <div className="mt-6 min-h-[65vh]">
      <AlbumSlider albums={albums} />
      <Masonry photos={photos} />
    </div>
  );
};

export default UserGallery;
