"use client";
import ErrorMessage from "@/components/error-message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  user: any;
}

interface IFormData {
  name: string;
  website: string;
  location: string;
  instagram: string;
  camera: string;
  focal: string;
  bio: string;
}

const ProfileForm: FC<Props> = ({ user }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleProfile = (data: IFormData) => {
    setIsLoading(true);
    fetch("api/users/profile", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong");

        toast({
          title: "Success!",
          description: "Your profile has been updated succesfully.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validationSchema = z.object({
    name: z.string(),
    website: z.string(),
    location: z.string(),
    instagram: z.string().max(25, { message: "Instagram account too long" }),
    camera: z.string(),
    focal: z.string(),
    bio: z.string().max(255, { message: "Description is too long" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ValidationSchema>({
    defaultValues: {
      name: user?.name ?? "",
      location: user?.location ?? "",
      instagram: user?.instagram ?? "",
      camera: user?.camera ?? "",
      focal: user?.focal ?? "",
      website: user?.website ?? "",
      bio: user?.bio ?? "",
    },
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="w-full mt-6 border border-slate-100 rounded-md p-6">
      <form
        onSubmit={handleSubmit(handleProfile)}
        className="w-full">
        <div className="w-fit">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full mt-4 flex flex-col md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-2">Name *</label>
            <Input
              disabled
              className="mb-4  p-2 rounded-lg"
              {...register("name")}
            />

            {errors.name && <ErrorMessage message={errors.name.message as string} />}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Location</label>
            <Input
              className="mb-4 p-2 rounded-lg"
              {...register("location")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Website</label>
            <Input
              className="mb-4 p-2 rounded-lg"
              {...register("website")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Instagram</label>
            <Input
              className="mb-4 p-2 rounded-lg"
              {...register("instagram")}
            />
            {errors.instagram && <ErrorMessage message={errors.instagram.message as string} />}
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Camera/s</label>
            <Input
              className="mb-4 p-2 rounded-lg"
              {...register("camera")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Favorite focal length/s</label>
            <Input
              className="mb-4 p-2 rounded-lg"
              {...register("focal")}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="text-sm mb-2">Your bio</label>
            <Textarea
              className="mb-4 p-2 rounded-lg"
              {...register("bio")}
            />
          </div>
        </div>
        <Button
          className="mt-4"
          disabled={!isDirty}>
          {isLoading && <div className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-4 w-4 mr-2"></div>} Save changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
