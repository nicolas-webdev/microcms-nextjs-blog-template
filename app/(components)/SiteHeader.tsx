import { SITE_TITLE } from "@/config";

const SiteHeader = () => {
  return (
    <section className="dark:invert flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {SITE_TITLE}
      </h1>
      <p className="text-center md:text-left text-lg mt-5 md:pl-8">
        APPルーター・ISR対応の{" "}
        <a
          href="https://microcms.io/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          microCMS
        </a>
        ＆
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>
        の<br />
        ブログテンプレート。
      </p>
    </section>
  );
};

export default SiteHeader;
