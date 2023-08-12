import BlogHeader from "@/app/blog/[slug]/BlogHeader";

export default function PreviewLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="min-w-full text-center bg-yellow-400 font-semibold">
        <div className="container mx-auto px-5 py-2">
          <p className="text-sm">
            プレビューモードがオンになっています。このページは公開されていません。
            <a
              href="/api/draft/exit"
              className="text-blue-700 underline hover:text-blue-500"
            >
              プレビューモードを出る
            </a>
          </p>
        </div>
      </header>
      <BlogHeader />
      {children}
    </>
  );
}
