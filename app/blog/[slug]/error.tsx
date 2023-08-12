"use client"; // エラーコンポーネントはクライアントサイドでのみレンダリングされる

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    // TODO: エラーをログツールに送信
    console.error(error);

    // エラーの処理が終わったらトップページに戻る
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return <></>;
}
