import { WorkSpace } from '@/types/app';
import { FaPlus } from 'react-icons/fa';
import { RiHome2Fill } from 'react-icons/ri';
import { PiChatsTeardrop } from 'react-icons/pi';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/typography';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

type SidebarNavProps = {
  userWorkspaceData: WorkSpace[];
  currentWorkspaceData: WorkSpace;
};

const SidebarNav = ({
  userWorkspaceData,
  currentWorkspaceData,
}: SidebarNavProps) => {
  console.log('xxxxxx');
  console.log(currentWorkspaceData);
  console.log('xxxxxx');
  return (
    <nav>
      <ul className="flex flex-col space-y-4 items-center">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage
                      src={currentWorkspaceData.image_url || ''}
                      alt={currentWorkspaceData.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-neutral-700">
                      <Typography
                        text={currentWorkspaceData.name.slice(0, 2)}
                      />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="p-0" side="bottom">
                  <Card className="w-[350px] border-0">
                    <CardContent className="flex p-0 flex-col">
                      {userWorkspaceData.map((workspace) => (
                        <div
                          key={workspace.id}
                          className="hover:opacity-70 px-2 py-1 flex gap-2"
                        >
                          <Avatar>
                            <AvatarImage
                              src={currentWorkspaceData.image_url || ''}
                              alt={currentWorkspaceData.name}
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback className="bg-neutral-700">
                              <Typography
                                text={currentWorkspaceData.name.slice(0, 2)}
                              />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Typography
                              variant="p"
                              text={workspace.name}
                              className="text-sm"
                            />
                            <Typography
                              variant="p"
                              text={workspace.invite_code || ''}
                              className="text-xs lg:text-xm"
                            />
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex item-center gap-2 p2">
                        <Button variant="secondary">
                          <FaPlus></FaPlus>
                        </Button>
                        <Typography variant="p" text="Add Workspace" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
