import { SITE_URL } from "@/config";
import { getBlogList } from "@/lib/microcms";

export default async function sitemap() {
  const lastModified = new Date();

  const blogList = await getBlogList();
  const blogs = blogList.map((blog) => {
    return {
      url: `${SITE_URL}/blog/${blog.slug || blog.id}`,
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
