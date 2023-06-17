import { FC } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { PencilIcon, Trash2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  albumId: string;
}

const ContextMenuAlbum: FC<Props> = ({ children, albumId }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <PencilIcon className="w-4 h-4 mr-2" /> Add to album
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem asChild={true}>
          <div className="text-red-500 hover:bg-red-500 hover:text-white">
            <Trash2 className="w-4 h-4 mr-2" /> Remove photo
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuAlbum;
