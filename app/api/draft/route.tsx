// route handler enabling draft mode
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { DRAFT_SECRET } from "@/config";

const path = "blog";
export const runtime = "edge";

export async function GET(request: Request) {
  // クエリーパラメーターを取得
  const { searchParams } = new URL(request.url);
  const [id, draftKey, secret] = [
    searchParams.get("id"), // microCMSのCONTENT_IDを取得
    searchParams.get("draftKey"), // microCMSのdraftKeyを取得
    searchParams.get("secret"),
  ];

  //  クエリーパラメーターが不正な場合はエラー
  if (!secret || secret !== DRAFT_SECRET || !id || !draftKey) {
    return new Response("不正なクエリーパラメーター", { status: 400 });
  }

  // draftModeのクッキーを設定
  draftMode().enable();
  console.log("プレビューモードを有効にしました");

  // プレビューで記事へリダイレクト
  redirect(`/${path}/preview/${id}?draftKey=${draftKey}`);
}
