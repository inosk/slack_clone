import { getUserData } from '@/actions/get-user-data';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import { WorkSpace } from '@/types/app';
import InfoSection from '@/components/info-section';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import NoDataScreen from '@/components/no-data-component';

const Page = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId)!;

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id,
  );

  if (userWorkspaceChannels.length) {
    redirect(
      `/workspace/${workspaceId}/channels/${userWorkspaceChannels[0].id}`,
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceData={userWorkspaceData as WorkSpace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId=""
        />
        <NoDataScreen
          workspaceName={currentWorkspaceData.name}
          userId={userData.id}
          workspaceId={currentWorkspaceData.id}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Page;
