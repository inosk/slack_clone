'use client';

import { FiPlus } from 'react-icons/fi';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PlaceHolder from '@tiptap/extension-placeholder';
import MenuBar from './menu-bar';
import { useState } from 'react';
import axios from 'axios';
import { Channel, WorkSpace } from '@/types/app';

type Props = {
  apiUrl: string;
  type: 'channel' | 'directMessage';
  channel: Channel;
  workspaceData: WorkSpace;
};

const TextEditor = ({ apiUrl, type, channel, workspaceData }: Props) => {
  const [content, setContent] = useState<string>('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${type === 'channel' ? channel.name : 'USERNAME'} `,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleSend = async () => {
    if (content.length < 2) return;
    try {
      await axios({
        withCredentials: true,
        method: 'POST',
        url: `${apiUrl}?channelId=${channel.id}&workspaceId=${workspaceData.id}`,
        data: { content },
      });
      setContent('');
      editor?.commands.setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden">
      <div className="sticky top-0 z-10">
        <MenuBar editor={editor} />
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1">
        <EditorContent
          className="prose w-full h-full dark:text-white leading-[1.15px] overflow-y-hidden"
          editor={editor}
        />
      </div>
      <div className="absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6">
        <FiPlus size={28} className="dark:text-black" />
      </div>

      <Button
        onClick={handleSend}
        disabled={content.length < 2}
        size="sm"
        className="absolute bottom-1 right-1"
      >
        <Send />
      </Button>
    </div>
  );
};

export default TextEditor;
