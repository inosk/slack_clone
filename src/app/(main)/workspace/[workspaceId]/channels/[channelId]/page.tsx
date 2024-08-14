import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import ChatGroup from '@/components/chat-group';
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
      <ChatGroup
        type="Channel"
        userData={userData}
        currentChannelData={currentChannelData}
        currentWorkspaceData={currentWorkspaceData as WorkSpace}
        slug={workspaceId}
        chatId={channelId}
        userWorkspaceChannels={userWorkspaceChannels}
        socketUrl="/api/web-socket/messages"
        socketQuery={{
          channelId: currentChannelData.id,
          workspaceId: workspaceId,
        }}
        apiUrl="/api/messages"
        headerTitle={currentChannelData.name}
        paramKey="channelId"
        paramValue={channelId}
        userWorkspaceData={userWorkspaceData as WorkSpace[]}
      />
    </div>
  );
};

export default Page;
