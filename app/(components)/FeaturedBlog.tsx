import { BlogPost } from "@/types/microcms";
import Image from "next/image";
import Placeholder from "@/public/img/placeholder.webp";
import Link from "next/link";

type FeaturedBlogProps = {
  blog: BlogPost;
};

const FeaturedBlog = (props: FeaturedBlogProps) => {
  const { blog } = props;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <div className="sm:mx-0  shadow-sm hover:shadow-lg transition-shadow duration-200">
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
                className="block absolute inset-0 m-auto max-w-full min-w-full object-cover"
                sizes="100vw"
              />
            </span>
          </Link>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link className="hover:underline" href={`/blog/${blog.slug}`}>
              {blog.title || "フィーチャーブログ"}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <time dateTime={blog.publishedAt}>
              {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              に投稿
            </time>
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">
            {blog.description ||
              blog.content
                ?.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
                .slice(0, 255) + "..." ||
              ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
