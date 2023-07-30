import { SITE_TITLE } from "@/config";
import { ImageResponse } from "next/server";

export const runtime = "edge";

// Image generation
async function Image(size: string) {
  const dimensions = {
    width: parseInt(size),
    height: parseInt(size),
  };
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: dimensions.width / 1.5,
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
      ...dimensions,
    }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = searchParams.get("size");
  return Image(size || "32");
}
