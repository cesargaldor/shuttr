import prisma from "@/lib/prisma";

export async function uploadCloudinaryImage(imageData: FormData) {
  return await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`, {
    method: "POST",
    body: imageData,
  }).then((res) => {
    if (!res.ok) throw new Error("There was an error uploading your photo. Try again");

    return res.json();
  });
}

export async function getExifMetadata(publicId: string) {
  return await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/resources/image/upload/${publicId}?media_metadata=1`).then((res) => res.json());
}

export async function getUserPhotos(userId: string, albumId: string | undefined | null) {
  if (albumId) {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/user/${userId}?album=${albumId}`).then((res) => res.json());
  }
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/user/${userId}`).then((res) => res.json());
}

export async function getPhotoById(postId: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}`).then((res) => res.json());
}
