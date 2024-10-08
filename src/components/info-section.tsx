'use client';

import { cn } from '@/lib/utils';
import { useColorPreferences } from '@/providers/color-provider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa6';
import Typography from './ui/typography';
import CreateChannelDaialog from './create-channel-dialog';
import { Channel, User, WorkSpace } from '@/types/app';
import { useRouter } from 'next/navigation';

type InfoSectionProps = {
  userData: User;
  currentWorkspaceData: WorkSpace;
  userWorkspaceChannels: Channel[];
  currentChannelId: string | undefined;
};

const InfoSection = ({
  userData,
  currentWorkspaceData,
  userWorkspaceChannels,
  currentChannelId,
}: InfoSectionProps) => {
  const { color } = useColorPreferences();
  const [isChannelCollapsed, setIsChannelCollapsed] = useState<boolean>(true);
  const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] =
    useState<boolean>(true);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  let backgroundColor = 'bg-primary-light';
  if (color === 'green') {
    backgroundColor = 'bg-green-900';
  } else if (color === 'blue') {
    backgroundColor = 'bg-blue-900';
  }

  let hoverBg = 'hover:bg-primary-dark';
  if (color === 'green') {
    hoverBg = 'hover:bg-green-700';
  } else if (color === 'blue') {
    hoverBg = 'hover:bg-blue-700';
  }

  let secondaryBg = 'bg-primary-dark';
  if (color === 'green') {
    secondaryBg = 'bg-green-700';
  } else if (color === 'blue') {
    secondaryBg = 'bg-blue-700';
  }

  const navigateToChannel = (channelId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/channels/${channelId}`;
    router.push(url);
  };

  return (
    <div
      className={cn(
        'fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center',
        backgroundColor,
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div>
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={() =>
              setIsChannelCollapsed((prevState) => !prevState)
            }
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p" text="Channel" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn('cursor-pointer p-2 rounded-full', hoverBg)}>
                <FaPlus onClick={() => setDialogOpen(true)} />
              </div>
            </div>
            <CollapsibleContent>
              {userWorkspaceChannels.map((channel) => {
                const activeChannel = currentChannelId === channel.id;
                return (
                  <Typography
                    key={channel.id}
                    variant="p"
                    text={`# ${channel.name}`}
                    className={cn(
                      'px-2 py-1 rounded-sm cursor-pointer',
                      hoverBg,
                      activeChannel && secondaryBg,
                    )}
                    onClick={() => navigateToChannel(channel.id)}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          <Collapsible
            open={isDirectMessageCollapsed}
            onOpenChange={() =>
              setIsDirectMessageCollapsed((prevState) => !prevState)
            }
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDirectMessageCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography
                  variant="p"
                  text="Direct messages"
                  className="font-bold"
                />
              </CollapsibleTrigger>
              <div className={cn('cursor-pointer p-2 rounded-full', hoverBg)}>
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                variant="p"
                text="User 1"
                className={cn('px-2 py-1 rounded-sm cursor-pointer', hoverBg)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <CreateChannelDaialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        workspaceId={currentWorkspaceData.id}
        userId={userData.id}
      />
    </div>
  );
};

export default InfoSection;
