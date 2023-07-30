import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import { cache } from "react";

export async function generateStaticParams() {
  const posts = await getBlogList();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;
export const revalidate = 86400;

const getBlog = cache(async (slug: string) => {
  const response = await getBlogBySlug(slug);
  return response;
});

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  console.log(blog);
  return (
    <main>
      My Post: {params.slug}
      <h1>{blog.title}</h1>
      <article>{blog.content}</article>
    </main>
  );
}