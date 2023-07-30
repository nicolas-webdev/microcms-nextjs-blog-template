import { getBlogList } from "@/lib/microcms";
import Link from "next/link";
import { cache } from "react";

const getBlogs = cache(async () => {
  return await getBlogList();
});

const BlogList = async () => {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <div>
      BlogList
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          <p>{blog.publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
