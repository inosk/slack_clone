import { WorkSpace } from '@/types/app';
import { RiHome2Fill } from 'react-icons/ri';
import { PiChatsTeardrop } from 'react-icons/pi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/typography';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import CreateWorkspace from './create-workspace';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProgressBar from './progress-bar';
import { cn } from '@/lib/utils';
import { useColorPreferences } from '@/providers/color-provider';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type SidebarNavProps = {
  userWorkspaceData: WorkSpace[];
  currentWorkspaceData: WorkSpace;
};

const SidebarNav = ({
  userWorkspaceData,
  currentWorkspaceData,
}: SidebarNavProps) => {
  const router = useRouter();
  const [switchingWorkspace, setSwitcingWorkspace] = useState(false);
  const { color } = useColorPreferences();

  let backgroundColor = 'bg-primary-dark';
  if (color === 'green') {
    backgroundColor = 'bg-green-700';
  } else if (color) {
    backgroundColor = 'bg-blue-700';
  }
  const switchWorkspace = (id: string) => {
    setSwitcingWorkspace(true);
    router.push(`/workspace/${id}`);
    setSwitcingWorkspace(true);
  };

  const copyInviteLink = (inviteCode: string) => {
    const currentDomain = window.location.origin;
    navigator.clipboard.writeText(
      `${currentDomain}/create-workspace/${inviteCode}`,
    );

    toast.success('Invite link copied to clipboard');
  };

  return (
    <nav>
      <ul className="flex flex-col space-y-4 items-center">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={currentWorkspaceData.image_url || ''}
                    alt={currentWorkspaceData.name}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-neutral-700">
                    <Typography text={currentWorkspaceData.name.slice(0, 2)} />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom">
                <Card className="w-[350px] border-0">
                  <CardContent className="flex p-0 flex-col">
                    {switchingWorkspace ? (
                      <div className="m-2">
                        <ProgressBar />
                      </div>
                    ) : (
                      userWorkspaceData.map((workspace) => {
                        const isActive =
                          workspace.id === currentWorkspaceData.id;

                        return (
                          <div
                            key={workspace.id}
                            className={cn(
                              isActive && `${backgroundColor} text-white`,
                              `cursor-pointer px-2 py-1 flex gap-2`,
                            )}
                            onClick={() =>
                              !isActive && switchWorkspace(workspace.id)
                            }
                          >
                            <Avatar>
                              <AvatarImage
                                src={workspace.image_url || ''}
                                alt={workspace.name}
                                className="object-cover w-full h-full"
                              />
                              <AvatarFallback className="bg-neutral-700">
                                <Typography text={workspace.name.slice(0, 2)} />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Typography
                                variant="p"
                                text={workspace.name}
                                className="text-sm"
                              />
                              <div className="flex items-center gap-x-2">
                                <Typography
                                  variant="p"
                                  text="Copy Invite Link"
                                  className="text-xs lg:text-xm"
                                />
                                <Copy
                                  onClick={() =>
                                    copyInviteLink(workspace.invite_code!)
                                  }
                                  size={18}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <Separator />
                    <CreateWorkspace />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography
              variant="p"
              text="Home"
              className="text-sm lg:text-sm md:text-sm"
            />
          </div>
        </li>
        <li>
          <div className="flex flex-col cursor-pointer items-center group text-white">
            <div className="p-2 rounded-lg bg">
              <div className="flex flex-col item-center cursor-pointer group text-white">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
                  <PiChatsTeardrop />
                </div>
                <Typography
                  variant="p"
                  text="DMs"
                  className="text-sm lg:text-sm md:text-sm"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
