'use server';

import { createClient } from '@/supabase/supabaseServer';
import { getUserData } from './get-user-data';

export const createChannel = async ({
  name,
  userId,
  workspaceId,
}: {
  name: string;
  userId: string;
  workspaceId: string;
}) => {
  const supabase = createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: 'No user data' };
  }

  const { error, data: channelRecord } = await supabase
    .from('channels')
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select('*');

  if (error) {
    return { error: 'insert error' };
  }

  // Update channel members array
  const [, updateChannelMembersError] = await updateChannelMembers(
    channelRecord[0].id,
    userId,
  );

  if (updateChannelMembersError) {
    return { error: 'Update members channel Error' };
  }

  // Add channel to user's channels array
  const [, addChannelToUserError] = await addChannelToUser(
    userData.id,
    channelRecord[0].id,
  );

  if (addChannelToUserError) {
    return { error: 'Add members channel error' };
  }

  // Add channel to Workspace
  const [, updateWorkspaceError] = await updateWorkspaceChannel(
    channelRecord[0].id,
    workspaceId,
  );

  if (updateWorkspaceError) {
    return { error: 'Update Channel Workspace error' };
  }
};

const addChannelToUser = async (userId: string, channelId: string) => {
  const supabase = createClient();

  const { data: addChannelData, error: addChannelError } = await supabase.rpc(
    'update_user_channels',
    {
      channel_id: channelId,
      user_id: userId,
    },
  );

  return [addChannelData, addChannelError];
};

const updateChannelMembers = async (channelId: string, userId: string) => {
  const supabase = createClient();
  const { data: updateChannelData, error: updateChannelError } =
    await supabase.rpc('update_channel_members', {
      new_member: userId,
      channel_id: channelId,
    });
  return [updateChannelData, updateChannelError];
};

const updateWorkspaceChannel = async (
  channelId: string,
  workspaceId: string,
) => {
  const supabase = createClient();
  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await supabase.rpc('add_channel_to_workspace', {
      channel_id: channelId,
      workspace_id: workspaceId,
    });
  return [updateWorkspaceData, updateWorkspaceError];
};
