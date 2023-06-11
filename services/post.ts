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
