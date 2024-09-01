import { useSocket } from '@/providers/web-socket';
import { MessageWithUser } from '@/types/app';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

type Props = {
  addKey: string;
  queryKey: string;
  updateKey: string;
  paramValue: string;
};

export const useChatSocketConnection = ({
  addKey,
  paramValue,
  updateKey,
  queryKey,
}: Props) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleUpdateMessage = (message: any) => {
      queryClient.setQueryData([queryKey, paramValue], (prev: any) => {
        if (!prev || !prev.pages || !prev.pages.length) return prev;

        const newData = prev.pages.map((page: any) => ({
          ...page,
          data: page.data.pam((data: MessageWithUser) => {
            if (data.id === message.id) {
              return message;
            }
            return data;
          }),
        }));

        return {
          ...prev,
          pages: newData,
        };
      });
    };

    const handleNewMessage = (message: MessageWithUser) => {
      queryClient.setQueryData([queryKey, paramValue], (prev: any) => {
        if (!prev || !prev.pages || prev.pages.length === 0) return prev;

        const newPages = [...prev.pages];
        newPages[0] = {
          ...newPages[0],
          data: [message, ...newPages[0].data],
        };

        return {
          ...prev,
          pages: newPages,
        };
      });
    };

    socket.on(updateKey, handleUpdateMessage);
    socket.on(addKey, handleNewMessage);

    return () => {
      socket.off(updateKey, handleUpdateMessage);
      socket.off(addKey, handleNewMessage);
    };
  }, [addKey, updateKey, queryKey, queryClient, socket, paramValue]);
};
