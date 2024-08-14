import ChatHeader from '@/components/chat-header';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import TextEditor from '@/components/text-editor';
import Typography from '@/components/ui/typography';
import { Channel, User, WorkSpace } from '@/types/app';

type Props = {
  type: 'Channel' | 'DirectMessage';
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'receipientId';
  paramValue: string;
  userData: User;
  currentWorkspaceData: WorkSpace;
  currentChannelData: Channel | undefined;
  userWorkspaceData: WorkSpace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};

const ChatGroup = ({
  apiUrl,
  chatId,
  headerTitle,
  paramKey,
  paramValue,
  socketUrl,
  socketQuery,
  type,
  userData,
  userWorkspaceData,
  userWorkspaceChannels,
  currentChannelData,
  currentWorkspaceData,
}: Props) => {
  return (
    <>
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
          currentChannelId={
            type === 'Channel' ? currentChannelData?.id : undefined
          }
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} useData={userData} />
          <div className="mt-10">
            <Typography text="Chat content" variant="h4" />
          </div>
        </div>
      </div>
      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          type={type}
          channel={currentChannelData}
          workspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          recipientId={type === 'DirectMessage' ? chatId : undefined}
        />
      </div>
    </>
  );
};
export default ChatGroup;
