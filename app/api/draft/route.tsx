// route handler enabling draft mode
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getBlogBySlug } from "@/lib/microcms";
import { DRAFT_SECRET } from "@/config";

export async function GET(request: Request) {
  // クエリーパラメーターを取得
  const { searchParams } = new URL(request.url);
  const [secret, slug, path] = [
    searchParams.get("secret"),
    searchParams.get("slug"),
    searchParams.get("path"),
  ];

  //  クエリーパラメーターが不正な場合はエラー
  if (!secret || secret !== DRAFT_SECRET || !slug || !path) {
    return new Response("不正なクエリーパラメーター", { status: 400 });
  }

  // ブログ記事を取得
  const blog = await getBlogBySlug(slug);

  // 記事が存在しない場合はエラー
  if (!blog) {
    return new Response("記事が見つかりませんでした", { status: 404 });
  }

  // draftModeのクッキーを設定
  draftMode().enable();
  console.log("プレビューモードを有効にしました");

  // プレビューで記事へリダイレクト
  redirect(`/${path}/${blog.slug || blog.id}`);
}
