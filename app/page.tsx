import BlogList from "@/app/(components)/BlogList";
import FeaturedBlog from "@/app/(components)/FeaturedBlog";
import SiteHeader from "@/app/(components)/SiteHeader";
import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import { cache } from "react";

const getFeaturedBlog = cache(async (slug?: string) => {
  if (slug) {
    const response = await getBlogBySlug(slug);
    return response;
  }
  const response = await getBlogList();
  return response[0];
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
