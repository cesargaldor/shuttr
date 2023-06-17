"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { FC, useState } from "react";
import Spinner from "../ui/spinner";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface Props {
  handleDeleteAlbum: () => void;
}

const DeleteAlbumModal: FC<Props> = ({ handleDeleteAlbum }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AlertDialog
      defaultOpen={false}
      open={open}>
      <AlertDialogTrigger asChild>
        <XIcon
          onClick={() => setOpen(true)}
          className="w-3 h-3 text-sm absolute -top-1 -right-1 bg-black text-white dark:bg-white dark:text-black rounded-full hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-100"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this album?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-500 text-white"
              onClick={handleDeleteAlbum}>
              {isLoading && <Spinner />}
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlbumModal;
