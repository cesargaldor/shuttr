"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/error-message";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

const FileDrop = () => {
  const [photo, setPhoto] = useState<{ preview?: string }>({});

  const handleUpload = () => {};

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    maxSize: 3145728, // 3MB in bytes
    onDrop: (files) => {
      const blob = Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      });

      setPhoto(blob);
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
    location: z.string().min(1, { message: "Location is required" }),
    caption: z.string().max(255, { message: "Caption is too long" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      location: "",
      caption: "",
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
        <div className="grid grid-cols-2 gap-10">
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
              className="w-full">
              <div className="flex flex-col">
                <label className="text-sm mb-2">Location *</label>
                <Input
                  className="mb-4 w-full p-2 rounded-lg"
                  {...register("location")}
                />

                {errors.location && <ErrorMessage message={errors.location.message as string} />}
              </div>

              <div className="flex flex-col col-span-2">
                <label className="text-sm mb-2">Caption</label>
                <Textarea
                  className="mb-4 p-2 rounded-lg"
                  {...register("caption")}
                />
                {errors.caption && <ErrorMessage message={errors.caption.message as string} />}
              </div>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
                variant="secondary"
                className="mr-3">
                Choose another photo
              </Button>
              <Button>Upload</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDrop;
