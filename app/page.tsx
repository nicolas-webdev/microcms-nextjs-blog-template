import BlogList from "@/app/(components)/BlogList";
import FeaturedBlog from "@/app/(components)/FeaturedBlog";
import SiteHeader from "@/app/(components)/SiteHeader";
import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import { cache } from "react";

const getFeaturedBlog = cache(async (slug?: string) => {
  return slug ? await getBlogBySlug(slug) : (await getBlogList())[0];
});

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
