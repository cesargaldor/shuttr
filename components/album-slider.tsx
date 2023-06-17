"use client";
import { ExtendedAlbum } from "@/types/ExtendedAlbum";
import { FC, useState } from "react";
import CreateAlbumModal from "./modals/create-album-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContextMenuAlbum from "./context-menu-album";
import { XIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import DeleteAlbumModal from "./modals/delete-album-modal";

interface Props {
  albums: ExtendedAlbum[];
}

const ALL_PHOTOS_TITLE = "All photos";

const AlbumSlider: FC<Props> = ({ albums }) => {
  const { toast } = useToast();
  const query = useSearchParams();
  const albumId = query.get("album");
  const albumTitle = albumId ? (albums?.find((a) => a.id === albumId)?.title as string) : ALL_PHOTOS_TITLE;
  const [selectedAlbum, setSelectedAlbum] = useState<string>(albumTitle);
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteAlbum = () => {
    if (!albumId) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/album/${albumId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error);
        }
        toast({
          title: "Success!",
          description: "Album has been deleted.",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Oh! Something went wrong.",
          description: error.message,
        });
      })
      .finally(() => {
        setSelectedAlbum(ALL_PHOTOS_TITLE);
        router.replace(pathname);
        router.refresh();
      });
  };

  const handleSetRoute = (albumId?: string) => {
    if (!albumId) {
      router.replace(pathname);
      setSelectedAlbum(ALL_PHOTOS_TITLE);
      return;
    }

    router.replace(`${pathname}?album=${albumId}`);
    setSelectedAlbum(albums?.find((a) => a.id === albumId)?.title as string);
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-3xl font-semibold">{selectedAlbum}</h2>
        <CreateAlbumModal />
      </div>
      <div className="flex gap-4 mt-6">
        <div
          onContextMenu={(e) => e.preventDefault()}
          onClick={() => handleSetRoute()}
          className={`w-fit flex items-center ${!!albumId ? "bg-transparent" : "bg-muted font-semibold"} rounded-md px-4 py-2 text-sm cursor-pointer`}>
          <p className="mr-1">All photos</p>
        </div>
        {albums?.map((a: ExtendedAlbum) => {
          return (
            <div
              key={a.id}
              onClick={() => handleSetRoute(a.id)}
              className={`relative w-fit flex items-center ${albumId === a.id ? "bg-muted font-semibold" : ""} rounded-md px-4 py-2 text-sm cursor-pointer`}>
              <p className="mr-1">{a.title}</p>
              <span>({a.images?.length})</span>
              {albumId === a.id && <DeleteAlbumModal handleDeleteAlbum={handleDeleteAlbum} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumSlider;
