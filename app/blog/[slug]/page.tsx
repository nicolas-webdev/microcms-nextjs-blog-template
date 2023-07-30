import PostBody from "@/app/(components)/PostBody";
import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import Image from "next/image";
import Placeholder from "@/public/img/placeholder.webp";
import { cache } from "react";
import { formatDateJP } from "@/lib/utils";

// ２４時間ごとに更新でISR
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
    <article className="container mx-auto px-5 mb-32">
      <h1 className="dark:invert text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-12 text-center md:text-left">
        {blog.title}
      </h1>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <div className="sm:mx-0">
          <Image
            alt={blog.title || ""}
            src={blog.eyecatch?.url || Placeholder}
            width={1920}
            height={1080}
          />
        </div>
      </div>
      <div className="mb-6 text-lg text-center">
        <time dateTime={blog.publishedAt}>
          {formatDateJP(blog.publishedAt)}
        </time>
      </div>
      <PostBody
        htmlContent={
          blog.content || `<div>ブログ内容の読み込みに失敗しました</div>`
        }
      />
    </article>
  );
}
