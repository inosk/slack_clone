import MainContent from '@/components/main-content';
import { ColorPreferencesProvider } from '@/providers/color-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPreferencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPreferencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
