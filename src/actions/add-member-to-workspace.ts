import { createClient } from '@/supabase/supabaseServer';

export const addMemberToWorkspace = async (
  userId: string,
  workspaceId: string,
) => {
  const supabase = createClient();
  const { data: addMemberToWorkspaceDate, error: addMemberToWorkspaceError } =
    // supabseのrpcで更新する
    // rpcはsupbase側で定義
    // rpcでは主に方の変換(array変換)を定義。
    await supabase.rpc('add_member_to_workspace', {
      user_id: userId,
      workspace_id: workspaceId,
    });
  return [addMemberToWorkspaceDate, addMemberToWorkspaceError];
};
