// opengraph-image.tsx
import { SITE_TITLE } from "@/config";
import { opengraphStyle } from "@/lib/utils";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={opengraphStyle}>{SITE_TITLE}</div>, {
    ...size,
  });
}
