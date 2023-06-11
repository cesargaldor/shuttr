import { getCurrentUser, getUserProfile } from "@/services/user";
import { FC } from "react";
import ProfileHeader from "./profile-header";
import Masonry from "@/components/masonry";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const user = await getUserProfile(params.username);

  return {
    title: `${user?.name} - Photographer on Shuttr`,
  };
}

const UserProfile: FC<Props> = async ({ params }) => {
  const user = await getUserProfile(params.username);
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-[60vh]">
      <ProfileHeader
        user={user}
        isCurrentUser={currentUser?.id === user?.id}
      />
      <div className="mt-20">
        <h2 className="font-semibold text-3xl pb-4">All photos</h2>
        <Masonry photos={user?.posts} />
      </div>
    </div>
  );
};

export default UserProfile;
