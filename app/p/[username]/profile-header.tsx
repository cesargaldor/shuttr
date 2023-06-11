import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { checkUserInstagram } from "@/utils/socials";
import { User } from "@prisma/client";
import { CameraIcon, CircleDotIcon, CloudIcon, InstagramIcon, MapPinIcon, PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  user: User;
  isCurrentUser: boolean;
}

const ProfileHeader: FC<Props> = ({ user, isCurrentUser }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Avatar className="md:w-32 md:h-32 2xl:w-36 2xl:h-36">
          <AvatarImage src={user?.image as string} />
          <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-black">{user?.name}</h2>

          <div className="flex flex-col">
            {user?.location && (
              <div className="flex items-center gap-1 mt-2">
                <MapPinIcon className="w-4 h-4" /> {user.location}
              </div>
            )}

            {user?.camera && (
              <div className="flex items-center gap-1 mt-2">
                <CameraIcon className="w-4 h-4" /> {user.camera}
              </div>
            )}

            {user?.focal && (
              <div className="flex items-center gap-1 mt-2">
                <CircleDotIcon className="w-4 h-4" /> {user.focal}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {isCurrentUser && (
          <Button variant="secondary">
            <Link
              href="/dashboard"
              className="flex items-center">
              <PencilIcon className="w-4 h-4 mr-1" /> Edit profile
            </Link>
          </Button>
        )}

        {user?.website && (
          <Button variant="secondary">
            <a
              href={user.website}
              target="_blank"
              className="flex items-center">
              <CloudIcon className="w-4 h-4 mr-1" /> Website
            </a>
          </Button>
        )}

        {user?.instagram && (
          <Button variant="secondary">
            <a
              href={`https://www.instagram.com/${checkUserInstagram(user.instagram)}`}
              target="_blank"
              className="flex items-center">
              <InstagramIcon className="w-4 h-4 mr-1" /> Instagram
            </a>
          </Button>
        )}

        {/* <Button>
          <PlusIcon className="w-4 h-4 mr-1 text-white" /> Follow
        </Button> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
