import { createClient } from '@/supabase/supabaseServer';
import { WorkSpace } from '@/types/app';

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .in('id', workspaceIds);

  return [data as WorkSpace[] | null, error];
};

export const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single();

  if (error) {
    return [null, error];
  }

  return [data as WorkSpace | null, error];
};
