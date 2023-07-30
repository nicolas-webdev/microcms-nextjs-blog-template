import { getBlogList } from "@/lib/microcms";
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
      {blogs.map((blog: any) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
