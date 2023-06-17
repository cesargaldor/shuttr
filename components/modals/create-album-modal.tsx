"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../error-message";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Album } from "@prisma/client";
import Spinner from "../ui/spinner";

interface Props {}

const CreateAlbumModal: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const validationSchema = z.object({
    title: z.string().min(1, { message: "Album title is required" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ValidationSchema>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const handleCreateEditAlbum = (data: { title: string }) => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/album/create`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error);
        }
        toast({
          title: "Success!",
          description: "Album has been created.",
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
        setIsLoading(false);
        setOpen(false);
        reset();
        router.refresh();
      });
  };

  return (
    <AlertDialog
      defaultOpen={false}
      open={open}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="w-fit rounded-lg text-xs md:text-sm">
          <PlusIcon className="h-3 w-3 md:h-4 md:w-4" />
          <p className="ml-1">Add new album</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new album</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(handleCreateEditAlbum)}>
          <div className="flex flex-col mt-1">
            <Input
              placeholder="Album title"
              className="mb-4 p-2 rounded-lg"
              {...register("title")}
            />

            {errors.title && <ErrorMessage message={errors.title.message as string} />}
          </div>

          <div className="flex gap-3 self-end justify-end mt-2">
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="mt-2 md:mt-0"
                disabled={!isDirty}
                type="submit">
                {isLoading && <Spinner />}
                Create
              </Button>
            </AlertDialogAction>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateAlbumModal;
