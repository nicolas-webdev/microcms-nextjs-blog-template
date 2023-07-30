import { SITE_TITLE } from "@/config";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630,
};

// Image generation
async function Image(text: string) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </div>
    ),
    {
      ...size,
    }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("title");
  return Image(text || SITE_TITLE);
}
