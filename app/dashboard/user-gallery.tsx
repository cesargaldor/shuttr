import Masonry from "@/components/masonry";
import { getUserPhotos } from "@/services/post";
import { User } from "@prisma/client";
import { FC } from "react";

interface Props {
  user: User;
}

const UserGallery: FC<Props> = async ({ user }) => {
  const photos = await getUserPhotos(user?.id);

  return (
    <div className="mt-6">
      <Masonry photos={photos} />
    </div>
  );
};

export default UserGallery;
