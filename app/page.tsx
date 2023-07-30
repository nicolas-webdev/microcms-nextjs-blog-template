import BlogList from "@/app/(components)/BlogList";
import SiteHeader from "@/app/(components)/SiteHeader";

export default function Home() {
  return (
    <main className="container mx-auto px-5">
      <SiteHeader />
      <BlogList />
    </main>
  );
}
