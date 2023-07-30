import { SITE_TITLE } from "@/config";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {SITE_TITLE.slice(0, 1) || "N"}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
