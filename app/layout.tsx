import Footer from "@/app/(components)/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

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
