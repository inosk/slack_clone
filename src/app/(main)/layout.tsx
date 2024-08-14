import MainContent from '@/components/main-content';
import { ColorPreferencesProvider } from '@/providers/color-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { WebSocketProvider } from '@/providers/web-socket';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent>{children}</MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
