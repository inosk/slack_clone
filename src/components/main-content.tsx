'use client';

import { cn } from '@/lib/utils';
import { useColorPreferences } from '@/providers/color-provider';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const { color } = useColorPreferences();

  let backgroundColor = 'bg-primary-dark';
  if (color === 'green') {
    backgroundColor = 'bg-green-700';
  } else if (color) {
    backgroundColor = 'bg-blue-700';
  }

  return (
    <div
      className={cn('md:px-2 md:pb-2 md:pt-14 md:h-screen', backgroundColor)}
    >
      <main
        className={cn(
          'md:ml-[280px] md:rounded-r-xl lg:ml-[420px] md:h-full overflow-y-scroll [&::state(webkit-scrollbar-thumb)]:rounded-[6px] [&::state(webkit-scrollbar-thumb)]:bg-foreground/60 [&::state(webkit-scrollbar-track)]:bg-none [&::state(webkit-scrollbar)]:w-2',
          theme === 'dark' ? 'bg-[#232529]' : 'bg-white',
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
