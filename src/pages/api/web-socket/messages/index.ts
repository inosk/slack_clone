import { getUserDataPages } from '@/actions/get-user-data';
import supabaseServerClientPages from '@/supabase/supabaseServerPages';
import { SocketIoApiResponse } from '@/types/app';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: SocketIoApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Mehotd not allowed' });

  try {
    const userData = await getUserDataPages(req, res);
    if (!userData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { channelId, workspaceId } = req.query;
    if (!channelId || !workspaceId) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const { content, fileUrl } = req.body;

    if (!content && !fileUrl) {
      return res.status(400).json({ messaeg: 'Bad Request' });
    }

    const supabase = supabaseServerClientPages(req, res);
    const { data: channelData } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .contains('members', [userData.id]);

    if (!channelData) {
      return res.status(403).json({ message: 'Channel not found' });
    }

    const { error: creatingMessageError, data } = await supabase
      .from('messages')
      .insert([
        {
          content,
          file_url: fileUrl,
          channel_id: Array.isArray(channelId) ? channelId[0] : channelId,
          user_id: userData.id,
          workspace_id: Array.isArray(workspaceId)
            ? workspaceId[0]
            : workspaceId,
        },
      ])
      .select('*, user: user_id(*)')
      .order('created_at', { ascending: true })
      .single();

    if (creatingMessageError) {
      console.log('Message Creation Error: ', creatingMessageError);
      return res.status(500).json({ messages: 'Internal Server Error' });
    }

    if (creatingMessageError) {
      console.log('MESSAGE CREATION ERROR: ', creatingMessageError);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res?.socket?.server?.io?.emit(
      `channel:${channelId}:channel-messages`,
      data,
    );

    return res
      .status(200)
      .json({ message: 'Message created successfully', data });
  } catch (error) {
    console.log('MESSAGE CREATION ERROR: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
