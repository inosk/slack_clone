import ChatHeader from '@/components/chat-header';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import TextEditor from '@/components/text-editor';
import { Channel, User, WorkSpace } from '@/types/app';
import ChatMessages from '@/components/chat-messages';
import SearchBar from './search-bar';

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
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::state(webkit-scrollbar-thumb)]:rounded-[6px] [&::state(webkit-scrollbar-thumb)]:bg-foreground/60 [&::state(webkit-scrollbar-track)]:bg-none [&::state(webkit-scrollbar)]:w-2">
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
        <SearchBar
          currentWorkspaceData={currentChannelData}
          currentChannelData={currentChannelData}
          loggedInUserId={userData.id}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} useData={userData} />
          <div className="mt-10">
            <ChatMessages
              userData={userData}
              name={currentChannelData?.name ?? 'USERNAME'}
              workspaceData={currentWorkspaceData}
              chatId={chatId}
              type={type}
              apiUrl={apiUrl}
              socketUrl={socketUrl}
              socketQuery={socketQuery}
              paramKey={paramKey}
              paramValue={paramValue}
              channelData={currentChannelData}
            />
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
