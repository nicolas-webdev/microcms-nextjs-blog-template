import { cache } from "react";
import BlogList from "@/app/(components)/BlogList";
import FeaturedBlog from "@/app/(components)/FeaturedBlog";
import { REVALIDATE_INTERVAL } from "@/config";
import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import SiteHeader from "@/app/(components)/SiteHeader";

const getFeaturedBlog = cache(async (slug?: string) => {
  try {
    // スラグが指定されている場合、そのブログを取得
    // されていない場合は、最初のブログを取得
    return slug ? await getBlogBySlug(slug) : (await getBlogList())[0];
  } catch (error) {
    console.error("ブログの取得に失敗しました:", error);
    return null; // UIでnullの取り扱いを適切に行ってください
  }
});

export const runtime = "edge";
export const revalidate = REVALIDATE_INTERVAL;

export default async function Home() {
  const featuredBlog = await getFeaturedBlog();

  return (
    <main className="container mx-auto px-5">
      <SiteHeader />
      <FeaturedBlog blog={featuredBlog} />
      <BlogList />
    </main>
  );
}
