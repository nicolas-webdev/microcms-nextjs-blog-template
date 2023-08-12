import BlogHeader from "@/app/blog/[slug]/BlogHeader";
import { draftMode } from "next/headers";

export default function PreviewLayout({
  children, // ページまたはNested Layoutのコンポーネント
}: {
  children: React.ReactNode;
}) {
  return draftMode().isEnabled ? (
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
  ) : (
    <div>
      <p>
        プレビューモードがオフになっています。このページは公開されていません。
      </p>
    </div>
  );
}
