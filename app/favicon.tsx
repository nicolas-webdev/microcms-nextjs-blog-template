import { SITE_TITLE } from "@/config";
import { faviconStyle } from "@/lib/utils";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={faviconStyle}>{SITE_TITLE.slice(0, 1) || "N"}</div>,
    { ...size }
  );
}
