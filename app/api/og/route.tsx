import { SITE_TITLE } from "@/config";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = SITE_TITLE;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const font = fetch(
  new URL("/assets/NotoSansJP-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// Image generation
async function Image(text: string) {
  const fontData = await font;

  return new ImageResponse(
    (
      // ImageResponse JSX element
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
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "NotoSansJP",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("title");
  return Image(text || SITE_TITLE);
}
