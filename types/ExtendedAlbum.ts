import { Album, Post } from "@prisma/client";

export interface ExtendedAlbum extends Album {
  images: Post[];
}
