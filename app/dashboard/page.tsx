import { getCurrentUser } from "@/services/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./profile-form";
import FileDrop from "./file-drop";
import { User } from "@prisma/client";

const Dashboard = async () => {
  const user = (await getCurrentUser()) as User;

  return (
    <div>
      <Tabs
        defaultValue="profile"
        className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="photos">My photos</TabsTrigger>
          <TabsTrigger value="upload">Upload photo</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm user={user} />
        </TabsContent>
        <TabsContent value="upload">
          <FileDrop user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
