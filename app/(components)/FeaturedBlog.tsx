import { BlogPost } from "@/types/microcms";
import Image from "next/image";
import Placeholder from "@/public/img/placeholder.webp";
import Link from "next/link";
import { formatDateJP, generateBlogDescription } from "@/lib/utils";

type FeaturedBlogProps = {
  blog: BlogPost | null;
};

// 画像部分のコンポーネント
const FeaturedBlogImage = ({ blog }: { blog: BlogPost }) => (
  <div className="mb-8 md:mb-16">
    <div className="sm:mx-0 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <Link
        aria-label={blog.title || "フィーチャーブログへ"}
        href={`/blog/${blog.slug}`}
      >
        <span className="block overflow-hidden relative box-border m-0">
          <span className="block box-border pt-[50%]"></span>
          <Image
            priority
            alt={blog.title || ""}
            src={blog.eyecatch?.url || Placeholder}
            height={blog.eyecatch?.height}
            width={blog.eyecatch?.width}
            className="block absolute inset-0 m-auto max-w-full min-w-full object-cover dark:rounded-md"
            sizes="100vw"
          />
        </span>
      </Link>
    </div>
  </div>
);

const FeaturedBlog = (props: FeaturedBlogProps) => {
  const { blog } = props;

  // ブログの情報がない場合、何も描画しない
  if (!blog) return null;

  return (
    <section>
      <FeaturedBlogImage blog={blog} />

      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28 dark:invert">
        <div>
          <h2 className="mb-4 font-semibold text-4xl lg:text-5xl leading-[1.35] lg:leading-[1.2]">
            <Link className="hover:underline" href={`/blog/${blog.slug}`}>
              {blog.title || "フィーチャーブログ"}
            </Link>
          </h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">
            {blog.description ||
              (blog.content && generateBlogDescription(blog.content)) ||
              ""}
          </p>
          <div className="mt-2 text-md">
            <time dateTime={blog.publishedAt}>
              {formatDateJP(blog.publishedAt)}に投稿
            </time>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
