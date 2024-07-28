import { getUserData } from '@/actions/get-user-data';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/actions/workspaces';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import { WorkSpace } from '@/types/app';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
    userData.workspaces!,
  );

  console.log(id);
  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id)!;

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData as WorkSpace}
          userData={userData}
          userWorkspaceData={userWorkspaceData as WorkSpace[]}
        />
      </div>
      ;<div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Page;
