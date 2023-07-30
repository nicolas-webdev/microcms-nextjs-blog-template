import Footer from "@/app/(components)/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import {
  SITE_AUTHOR,
  SITE_AUTHOR_TWITTER,
  SITE_AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "@/config";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

const metadataBaseUrl = SITE_URL;
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(metadataBaseUrl),
  applicationName: SITE_TITLE,
  manifest: `${metadataBaseUrl}/api/manifest`,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  publisher: "Next.js",
  keywords: ["Next.js", "React", "microCMS"],
  authors: [{ name: SITE_AUTHOR }, { name: SITE_AUTHOR, url: SITE_AUTHOR_URL }],
  creator: SITE_AUTHOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [SITE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: SITE_AUTHOR_TWITTER,
    images: [SITE_IMAGE],
  },
};
