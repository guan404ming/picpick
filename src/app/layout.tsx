import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import NextAuthProvider from "@/lib/auth/NextAuthProvider";
import { NextThemeProvider } from "@/lib/theme/NextThemesProvider";

import { Toaster } from "@/components/ui/toaster"
import Sider from "./_components/Sider";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--noto-sans",
});

export const metadata: Metadata = {
  title: "PicPick",
  description:
    "PICPICK is a picture book recommendation website where users can receive AI-curated book suggestions by responding to psychological assessment questions.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NextAuthProvider>
        <body className={noto.className}>
          <div className="mx-auto flex">
            <NextThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
            >
              <Sider />
              <main className="flex max-h-screen w-full overflow-y-scroll">
                {children}
              </main>
              <Toaster />
            </NextThemeProvider>
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
