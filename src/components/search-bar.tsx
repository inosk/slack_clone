import { useColorPreferences } from '@/providers/color-provider';
import { Channel, User, Workspace } from '@/types/app';
import { useRouter } from 'next/navigation';

type Props = {
  userWorkspaceData: Workspace[];
  currentChannelData: Channel;
  loggedInUserId: string;
  slug: string;
};

const SearchBar = ({
  userWorkspaceData,
  currentChannelData,
  loggedinUserId,
}: Props) => {
  const { color } = useColorPreferences();
  const router = useRouter();

  const backGroundColor = 'bg-[#7a4a7f] dark:bg-[#311834]';
  if ( color === "") // 3:53::22
  return <div>SearchBar</div>;
};

export default SearchBar;
