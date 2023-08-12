import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  draftMode().disable();
  console.log("プレビューモードを無効にしました");
  redirect("/");
}
