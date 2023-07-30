import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-static";

const manifest = {
  name: SITE_TITLE,
  short_name: SITE_TITLE,
  start_url: SITE_URL,
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  description: SITE_DESCRIPTION,
  icons: [
    {
      src: "/api/icon?size=48",
      sizes: "48x48",
      type: "image/png",
    },
    {
      src: "/api/icon?size=72",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/api/icon?size=96",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/api/icon?size=144",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "/api/icon?size=168",
      sizes: "168x168",
      type: "image/png",
    },
    {
      src: "/api/icon?size=192",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/api/icon?size=512",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/api/icon?size=512",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

export async function GET() {
  return NextResponse.json(manifest);
}
