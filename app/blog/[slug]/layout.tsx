import BlogHeader from "@/app/blog/[slug]/BlogHeader";

export default function PostLayout({
  children, // ページまたはNested Layoutのコンポーネント
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
