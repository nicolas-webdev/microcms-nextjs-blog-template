import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Placeholder from "@/public/img/placeholder.webp";
import PostBody from "@/app/(components)/PostBody";
import { getBlogBySlug, getBlogList } from "@/lib/microcms";
import { cache } from "react";
import { formatDateJP } from "@/lib/utils";
import {
  REVALIDATE_INTERVAL,
  SITE_AUTHOR,
  SITE_AUTHOR_TWITTER,
  SITE_URL,
} from "@/config";

type Props = {
  params: { slug: string };
};

// 指定時間に更新するISR
export async function generateStaticParams() {
  const posts = await getBlogList();
  return posts.map((post) => ({
    slug: post.slug || post.id,
  }));
}

export const dynamicParams = true;
export const revalidate = REVALIDATE_INTERVAL;
export const runtime = "nodejs";

// ブログの取得をキャッシュする
const getBlog = cache(async (slug: string) => {
  try {
    const response = await getBlogBySlug(slug);
    return response;
  } catch (error) {
    console.error("ブログの取得に失敗しました。", error);
    throw error;
  }
});

// ブログページのメインコンポーネント
export default async function Page({ params }: Props) {
  try {
    const blog = await getBlog(params.slug);
    return (
      <article className="container mx-auto px-5 mb-32">
        <h1 className="dark:invert text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-12 text-center md:text-left">
          {blog.title}
        </h1>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <div className="sm:mx-0">
            <Image
              priority
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
  } catch (error) {
    console.error("ページのレンダリングに失敗しました。", error);
    throw error;
  }
}

// メタデータを生成する関数
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = params.slug;
    const blog = await getBlogBySlug(slug);
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: blog.title,
      description: blog.description,
      category: blog.category?.name,
      openGraph: {
        type: "article",
        title: blog.title,
        description: blog.description,
        publishedTime: blog.publishedAt,
        authors: [SITE_AUTHOR],
        url: `${SITE_URL}/blog/${blog.slug}`,
        images: [
          blog.eyecatch?.url ??
            `${SITE_URL}/api/og?title=${
              blog.title || "Next.js + MicroCMSブログ"
            }`,
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.description,
        creator: SITE_AUTHOR_TWITTER,
        images: [
          blog.eyecatch?.url ??
            `${SITE_URL}/api/og?title=${
              blog.title || "Next.js + MicroCMSブログ"
            }`,
        ],
      },
    };
  } catch (error) {
    console.error("メタデータの生成に失敗しました。", error);
    throw error;
  }
}
