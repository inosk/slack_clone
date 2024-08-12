import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import ChatHeader from '@/components/chat-header';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import TextEditor from '@/components/text-editor';
import Typography from '@/components/ui/typography';
import { WorkSpace } from '@/types/app';
import { redirect } from 'next/navigation';

const Page = async ({
  params: { workspaceId, channelId },
}: {
  params: { workspaceId: string; channelId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId)!;
  const userWorkspaceChannels = await getUserWorkspaceChannels(
    workspaceId,
    userData.id,
  );

  const currentChannelData = userWorkspaceChannels.find(
    (channel) => channel.id === channelId,
  );

  if (!currentChannelData) return redirect('/');
  if (!currentWorkspaceData) return redirect('/');

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] bg-red-400 overflow-y-auto [&::state(webkit-scrollbar-thumb)]:rounded-[6px] [&::state(webkit-scrollbar-thumb)]:bg-foreground/60 [&::state(webkit-scrollbar-track)]:bg-none [&::state(webkit-scrollbar)]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceData={userWorkspaceData as WorkSpace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={channelId}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={currentChannelData.name} />
          <div className="mt-10">
            <Typography text="Chat content" variant="h4" />
          </div>
        </div>
      </div>
      <div className="m-4">
        <TextEditor
          apiUrl="/api/web-socket/messages/"
          type="channel"
          channel={currentChannelData}
          workspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Page;
