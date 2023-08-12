import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>４０４ - ページが見つかりません</h2>
      <p>お探しのページは見つかりませんでした。</p>
      <Link href="/">トップページへ戻る</Link>
    </div>
  );
}
