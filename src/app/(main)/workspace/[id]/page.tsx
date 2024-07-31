import { getUserData } from '@/actions/get-user-data';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import { WorkSpace } from '@/types/app';
import InfoSection from '@/components/info-section';
import Typography from '@/components/ui/typography';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(id)!;

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceData={userWorkspaceData as WorkSpace[]}
        />
        <InfoSection />
        Workspace Workspace
        <Typography variant="h1" text="Workspace Workspace" />
        <Typography variant="h2" text="Workspace Workspace" />
        <Typography variant="h3" text="Workspace Workspace" />
        <Typography variant="h4" text="Workspace Workspace" />
        <Typography variant="h5" text="Workspace Workspace" />
        <Typography variant="h6" text="Workspace Workspace" />
        <Typography variant="p" text="Workspace Workspace" />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Page;
