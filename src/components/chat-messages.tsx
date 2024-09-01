'use client';

import { Channel, User, WorkSpace } from '@/types/app';
import { useChatFetcher } from '@/hooks/chat-fetcher';
import { DotAnimatedLoader } from './dot-animated-loader';
import ChatItem from './chat-item';
import { format } from 'date-fns';
import { useChatSocketConnection } from '@/hooks/useChatSocketConnection';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm';

type Props = {
  userData: User;
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: string;
  paramKey: 'channelId' | 'recipientId';
  paramValue: string;
  type: 'Channel' | 'DirectMessage';
  workspaceData: WorkSpace;
  channelData: Channel;
};

const ChatMessages = ({
  userData,
  name,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
  workspaceData,
  channelData,
}: Props) => {
  const queryKey =
    type === 'Channel' ? `channel:${chatId}` : `direct_mesage:${chatId}`;

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatFetcher({
      apiUrl,
      queryKey,
      pageSize: 10,
      paramKey,
      paramValue,
    });

  useChatSocketConnection({
    queryKey,
    addKey:
      type === 'Channel'
        ? `${queryKey}:channel-messages`
        : 'direct_messages:post',
    updateKey:
      type === 'Channel'
        ? `${queryKey}:channel-messages:update`
        : 'direct_messages:update',
    paramValue,
  });

  if (status === 'pending') {
    return <DotAnimatedLoader />;
  }

  if (status === 'error') {
    return <div>Error Occured</div>;
  }

  const renderMesaage = () =>
    data.pages.map((page) =>
      page.data.map((message) => (
        <ChatItem
          key={message.id}
          currentUser={userData}
          user={message.user}
          content={message.content}
          fileUrl={message.file_url}
          deleted={message.is_deleted}
          id={message.id}
          timestamp={format(new Date(message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          channelData={channelData}
        />
      )),
    );

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMesaage()}</div>
    </div>
  );
};

export default ChatMessages;
