import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400"] });

export const metadata: Metadata = {
  title: "Slackzz",
  description: "Slack clone condewithlari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
