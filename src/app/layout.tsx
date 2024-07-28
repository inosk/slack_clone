import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400'] });

export const metadata: Metadata = {
  title: 'Slackzz',
  description: 'Slack clone condewithlari',
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lato.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
