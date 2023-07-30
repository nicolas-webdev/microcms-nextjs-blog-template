import BlogHeader from "@/app/blog/[slug]/BlogHeader";

export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeader />
      {children}
    </>
  );
}
