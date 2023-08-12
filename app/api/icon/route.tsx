import { SITE_TITLE } from "@/config";
import { generateIconStyle } from "@/lib/utils";
import { ImageResponse } from "next/server";

export const runtime = "edge";

// 画像生成関数
async function Image(size: string) {
  const dimensions = {
    width: parseInt(size, 10),
    height: parseInt(size, 10),
  };

  // サイズが無効な場合のエラー処理
  if (isNaN(dimensions.width) || isNaN(dimensions.height)) {
    throw new Error("サイズパラメータが無効です");
  }

  return new ImageResponse(
    (
      <div style={generateIconStyle(dimensions)}>
        {SITE_TITLE.slice(0, 1) || "N"}
      </div>
    ),
    { ...dimensions }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = searchParams.get("size");

  try {
    return Image(size || "32");
  } catch (error) {
    // エラーレスポンスを適切な形式で返す
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
