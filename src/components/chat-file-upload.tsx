'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { v4 as uuid } from 'uuid';
import { Channel, User, WorkSpace } from '@/types/app';
import { FileIcon } from 'lucide-react';
import Typography from './ui/typography';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useState } from 'react';
import { supabaseBrowserClient } from '@/supabase/supabaseClient';
import { toast } from 'sonner';

type Props = {
  userData: User;
  workspaceData: WorkSpace;
  channel?: Channel;
  recipientId?: string;
  toggleFileUploadModal: () => void;
};

const formSchema = z.object({
  // FileList が node では使えないので any で代用
  file: (typeof window === 'undefined' ? z.any() : z.instanceof(FileList))
    .refine((files) => files?.length === 1, 'File is required')
    .refine((files) => {
      const file = files?.[0];
      return (
        file?.type === 'application/pdf' || file?.type.startsWith('image/')
      );
    }, 'File must be and image or a PDF'),
});

const ChatFileUpload = ({
  userData,
  workspaceData,
  channel,
  toggleFileUploadModal,
  recipientId,
}: Props) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const imageRef = form.register('file');

  async function handleUpload(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    const uniqueId = uuid();
    const file = values.file?.[0];
    if (!file) return;
    const supabase = supabaseBrowserClient;

    let fileTypePrefix = '';

    if (file.type === 'applicatoin/pdf') {
      fileTypePrefix = 'pdf';
    } else if (file.type.startsWith('image/')) {
      fileTypePrefix = 'img';
    }

    const fileName = `chat/${fileTypePrefix}-${uniqueId}`;

    const { data, error } = await supabase.storage
      .from('chat-files')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.log('Error uploading file', error);
      return { error: error.message };
    }

    let messageInsertError;

    if (recipinetId) {
      const { error: dmInsertError } = await supabase
        .from('direct_messages')
        .insert({
          file_url: data.path,
          user: userData.id,
          user_one: userData.id,
          user_two: recipientId,
        });

      messageInsertError = dmInsertError;
    } else {
      const { error: cmInsertError } = await supabase.from('messages').insert({
        file_url: data.path,
        user_id: userData.id,
        channel_id: channel.id,
        workspace_id: workspaceData.id,
      });

      messageInsertError = cmInsertError;
    }

    if (messageInsertError) {
      console.log('Error inserting message', messageInsertError);
      return { error: messageInsertError.message };
    }

    setIsUploading(false);
    toggleFileUploadModal();
    toast.success('File uploaded successfully');
    form.reset();
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            <Typography text="Drag and drop your file here" variant="p" />
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpload)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title" className="text-sm font-medium">
                      File
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        {...imageRef}
                        placeholder="Choose a file"
                        onChange={(event) =>
                          field.onChange(event.target?.files)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUploading} size="lg">
                <Typography text="Upload" variant="p" />
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatFileUpload;
