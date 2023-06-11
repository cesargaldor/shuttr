"use client";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/error-message";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { handleFileUploadErrors } from "@/utils/errors";
import { getExifMetadata, uploadCloudinaryImage } from "@/services/post";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface IFormData {
  location: string;
  title: string;
}

interface Props {
  user: User;
}

const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  color: "#65758b",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "68vh",
};

const acceptStyle = {
  borderColor: "#00e676",
  backgroundColor: "#f1f5f9",
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "#f1f5f9",
};

const FileDrop: FC<Props> = ({ user }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<FormData>();
  const [photo, setPhoto] = useState<{ preview?: string }>({});

  const handleUpload = async (data: IFormData) => {
    setIsLoading(true);
    const cloudinaryData = await uploadCloudinaryImage(imageData as FormData).catch((error) => {
      toast({
        variant: "destructive",
        title: "Oh! Something went wrong.",
        description: error.message,
      });
    });

    if (cloudinaryData) {
      // Check photometadata
      //const exifData = await getExifMetadata(cloudinaryData?.public_id);

      await fetch(`api/post/upload`, {
        method: "POST",
        body: JSON.stringify({
          image: cloudinaryData?.secure_url,
          ...data,
        }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("There was an error uploading your photo. Try again");

          toast({
            title: "Success!",
            description: "Your photo has been uploaded succesfully.",
          });

          return router.replace(`/p/${user?.email?.split("@")[0]}`);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Oh! Something went wrong.",
            description: error.message,
          });
        });
    }
    setIsLoading(false);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxFiles: 1,
    maxSize: 3145728, // 3MB in bytes
    onDrop: (files, rejections) => {
      if (rejections.length > 0) {
        toast({
          variant: "destructive",
          title: "Oh! Something went wrong.",
          description: handleFileUploadErrors(rejections[0].errors[0].message),
        });
      } else {
        const blob = Object.assign(files[0], {
          preview: URL.createObjectURL(files[0]),
        });

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string);
        setImageData(formData);
        setPhoto(blob);
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const validationSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(30, { message: "Title is too long" }),
    location: z.string().min(1, { message: "Location is required" }),
    description: z.string().max(255, { message: "Description is too long" }),
    camera: z.string().max(30, { message: "Camera is too long" }),
    shutter: z.string().max(5, { message: "Shuttr is too long" }),
    iso: z.string().max(5, { message: "ISO is too long" }),
    aperture: z.string().max(10, { message: "Aperture is too long" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      location: "",
      title: "",
      description: "",
      camera: "",
      shutter: "",
      aperture: "",
      iso: "",
    },
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="mt-6">
      {Object.keys(photo).length === 0 ? (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop a photo here, or click to select file</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative aspect-square">
              <Image
                src={photo.preview as string}
                alt="recent-upload"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <span className="mt-3 text-xs">Note: this is just a preview. Your photo is not going to be square.</span>
          </div>

          <div>
            <form
              onSubmit={handleSubmit(handleUpload)}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm mb-2">Title*</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("title")}
                />

                {errors.title && <ErrorMessage message={errors.title.message as string} />}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2">Location *</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("location")}
                />

                {errors.location && <ErrorMessage message={errors.location.message as string} />}
              </div>

              <div className="flex flex-col col-span-2">
                <label className="text-sm mb-2">Description</label>
                <Textarea
                  className="mb-2 p-2 rounded-lg"
                  {...register("description")}
                />
                {errors.description && <ErrorMessage message={errors.description.message as string} />}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2">Camera</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("camera")}
                />

                {errors.camera && <ErrorMessage message={errors.camera.message as string} />}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2">Shutter speed</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("shutter")}
                />

                {errors.shutter && <ErrorMessage message={errors.shutter.message as string} />}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2">ISO</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("iso")}
                />

                {errors.iso && <ErrorMessage message={errors.iso.message as string} />}
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2">Aperture</label>
                <Input
                  className="mb-2 w-full p-2 rounded-lg"
                  {...register("aperture")}
                />

                {errors.aperture && <ErrorMessage message={errors.aperture.message as string} />}
              </div>

              <div className="mt-2 col-span-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  variant="secondary"
                  className="mr-3">
                  Choose another photo
                </Button>
                <Button>{isLoading && <div className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-3 w-3 mr-2"></div>}Upload</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDrop;
