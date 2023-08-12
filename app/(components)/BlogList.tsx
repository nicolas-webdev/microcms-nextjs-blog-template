import { getBlogList } from "@/lib/microcms";
import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/public/img/placeholder.webp";
import { cache } from "react";
import { formatDateJP, generateBlogDescription } from "@/lib/utils";
import { BlogPost } from "@/types/microcms";

type Props = {
  blog: BlogPost;
};

// ブログデータのキャッシュ取得
const getBlogs = cache(async () => await getBlogList());

// ブログのカード要素を生成
const BlogCard = ({ blog }: Props) => (
  <div key={blog.id}>
    <div className="mb-5">
      <div className="sm:mx-0">
        <Link aria-label={blog.title || "ブログへ"} href={`/blog/${blog.slug}`}>
          <Image
            className="shadow-sm hover:shadow-md transition-shadow duration-200 dark:rounded-md"
            sizes="100vw"
            width={blog.eyecatch?.width}
            height={blog.eyecatch?.height}
            alt={blog.title || ""}
            src={blog.eyecatch?.url || Placeholder}
          />
        </Link>
      </div>
    </div>
    <h3 className="text-3xl mb-3 leading-snug dark:invert">
      <Link className="hover:underline" href={`/blog/${blog.slug}`}>
        {blog.title || "ブログタイトル"}
      </Link>
    </h3>
    <div className="text-lg mb-4 dark:invert">
      <time dateTime={blog.publishedAt}>
        {formatDateJP(blog.publishedAt)}に投稿
      </time>
    </div>
    <p className="text-lg leading-relaxed mb-4 dark:invert">
      {blog.description ||
        (blog.content && generateBlogDescription(blog.content)) ||
        ""}
    </p>
  </div>
);

// ブログ一覧のコンポーネント
const BlogList = async () => {
  const blogs = await getBlogs();

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight dark:invert">
        ブログ投稿
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
