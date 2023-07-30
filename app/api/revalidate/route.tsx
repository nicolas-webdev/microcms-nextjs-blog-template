import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { REVALIDATE_SECRET } from "@/config";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("X-SECRET");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({
      status: 403,
      statusText: "Forbidden",
    });
  }

  revalidatePath("/");
  revalidatePath("/blog/[slug]");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
