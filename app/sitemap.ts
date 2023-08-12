import { SITE_URL } from "@/config";
import { getBlogList } from "@/lib/microcms";
import { BlogPost } from "@/types/microcms";

// ブログのURLを生成
const generateBlogUrl = (blog: BlogPost) =>
  `${SITE_URL}/blog/${blog.slug || blog.id}`;

export default async function sitemap() {
  const lastModified = new Date();

  const blogList = await getBlogList();
  const blogs = blogList.map((blog) => {
    return {
      url: generateBlogUrl(blog),
      lastModified: blog.updatedAt || lastModified,
    };
  });

  return [
    {
      url: SITE_URL,
      lastModified,
    },
    ...blogs,
  ];
}
