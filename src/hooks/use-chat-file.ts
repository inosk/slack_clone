'use client';

import { supabaseBrowserClient } from '@/supabase/supabaseClient';
import { useEffect, useState } from 'react';

export const useChatFile = (filePath: string) => {
  const [publicUrl, setPublicUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = supabaseBrowserClient;

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const {
          data: { publicUrl },
          error,
        } = supabase.storage.from('chat-files').getPublicUrl(filePath);

        if (publicUrl) {
          setPublicUrl(publicUrl);

          if (filePath.startsWith('chat/img-')) {
            setFileType('img');
          } else if (filePath.startsWith('chat/pdf-')) {
            setFileType('pdf');
          }
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      fetchFile();
    }
  }, [filePath, supabase.storage]);

  console.log(publicUrl, fileType);
  return { publicUrl, fileType, loading, error };
};
