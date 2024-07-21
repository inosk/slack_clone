import { createClient } from '@/supabase/supabaseServer';

export const updateUserWorkspace = async (
  userId: string,
  workspaceId: string,
) => {
  const supabse = createClient();

  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await supabse.rpc('add_workspace_to_user', {
      user_id: userId,
      new_workspace: workspaceId,
    });

  return [updateWorkspaceData, updateWorkspaceError];
};
