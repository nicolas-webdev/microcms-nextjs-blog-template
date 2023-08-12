import Image from "next/image";
import Placeholder from "@/public/img/placeholder.webp";
import PostBody from "@/app/(components)/PostBody";
import { formatDateJP } from "@/lib/utils";
import { getPreviewBlog } from "@/lib/microcms";

export const runtime = "nodejs";

type Props = {
  params: { id: string };
};

const PreviewPost = async ({ params }: Props) => {
  const { searchParams } = new URL(location.href);
  const draftKey = searchParams.get("draftKey") || "";
  const blog = await getPreviewBlog(params.id, draftKey);

  if (!blog || !draftKey) {
    return <div>不正なクエリーパラメーターです</div>;
  }
  try {
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
};

export default PreviewPost;
