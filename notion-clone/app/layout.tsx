import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-providers";
import { ConvexClient } from "convex/browser";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

import { EdgeStoreProvider } from "@/lib/edgestore";
/**
 * User always feel not comfortable when they see a blank page
 * when they request something to backend. That's when toast come in.
 *  It give user a feedback that their request has been sent to
 * backend. It also give user a feedback that their request has
 * been success or failed.
 */
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";

// group file, reflect the entire project
// this is where you put a reusable layout like a
// sidebar and a navigation bar
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Notion",
  description: "The connected workspace where better, faster work happens",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="siyun-theme"
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
