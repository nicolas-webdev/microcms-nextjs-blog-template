"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);

    // Handle the Error
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return <></>;
}
