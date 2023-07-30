import { SITE_HOSTNAME, SITE_URL } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";

// タグタイプの定数
const TAG_TYPE = "tag";
const IMG_TAG = "img";
const A_TAG = "a";
const HOSTNAME = SITE_HOSTNAME;

// imgタグを処理するためのヘルパー関数
const handleImageTag = (element: Element) => {
  if (element.attribs?.src) {
    // 画像にheightとwidthの属性がある場合、アスペクト比を維持
    return element.attribs.height && element.attribs.width ? (
      <Image
        src={element.attribs.src}
        alt={element.attribs.alt || ""}
        width={parseInt(element.attribs.width)}
        height={parseInt(element.attribs.height)}
      />
    ) : (
      // 画像にheightやwidthの属性がない場合、layout fillを使用
      <div className="relative aspect-video">
        <Image
          src={element.attribs.src}
          alt={element.attribs.alt || ""}
          className="object-contain"
          layout="fill"
        />
      </div>
    );
  }
};

// aタグを処理するためのヘルパー関数
const handleATag = (element: Element, options: HTMLReactParserOptions) => {
  if (element.attribs?.href) {
    const href = element.attribs.href;
    const url = new URL(href, SITE_URL); // ベースURL
    const linkText = element.children?.length
      ? domToReact(element.children, options)
      : null;

    // リンクが内部の場合、Next.jsのLinkコンポーネントを使用
    if (url.hostname === HOSTNAME) {
      return <Link href={href}>{linkText}</Link>;
    } else {
      // リンクが外部の場合、target="_blank"を追加
      return (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {linkText}
        </a>
      );
    }
  }
};

const parseHTML = (htmlContent: string) => {
  const { window } = new JSDOM("");
  // DOMPurifyを使用してHTMLをサニタイズ
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(htmlContent);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === TAG_TYPE) {
        const element = domNode as Element;
        // imgタグを処理
        if (element.name === IMG_TAG) return handleImageTag(element);
        // aタグを処理
        if (element.name === A_TAG) return handleATag(element, options);
      }
    },
  };

  // サニタイズしたHTMLをパース
  return parse(clean, options);
};

type PostBodyProps = {
  htmlContent: string;
};

// 投稿本文を表示するコンポーネント
const PostBody = ({ htmlContent }: PostBodyProps) => {
  const parsedHtmlContents = parseHTML(htmlContent);
  // TailwindCSSのproseプラグインを使用してブログコンテンツをスタイル付け
  return (
    <article className="prose prose-slate lg:prose-xl dark:prose-invert prose-img:rounded-sm prose-headings:underline prose-a:text-blue-600">
      {parsedHtmlContents}
    </article>
  );
};

export default PostBody;
