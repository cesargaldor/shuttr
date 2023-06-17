import { Post, User } from "@prisma/client";

export interface ExtendedPost extends Post {
  user: User;
}
