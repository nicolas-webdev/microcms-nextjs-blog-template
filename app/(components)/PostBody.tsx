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

const TAG_TYPE = "tag";
const IMG_TAG = "img";
const A_TAG = "a";
const HOSTNAME = SITE_HOSTNAME;

// 画像タグの処理
const handleImageTag = (element: Element) => {
  if (element.attribs?.src) {
    return element.attribs.height && element.attribs.width ? (
      <Image
        src={element.attribs.src}
        alt={element.attribs.alt || ""}
        width={parseInt(element.attribs.width)}
        height={parseInt(element.attribs.height)}
      />
    ) : (
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

// リンクタグの処理
const handleATag = (element: Element, options: HTMLReactParserOptions) => {
  if (element.attribs?.href) {
    const href = element.attribs.href;
    const url = new URL(href, SITE_URL);
    const linkText = element.children?.length
      ? domToReact(element.children, options)
      : null;

    return url.hostname === HOSTNAME ? (
      <Link href={href}>{linkText}</Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {linkText}
      </a>
    );
  }
};

// HTMLのパース
const parseHTML = (htmlContent: string) => {
  const { window } = new JSDOM("");
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(htmlContent);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === TAG_TYPE) {
        const element = domNode as Element;
        if (element.name === IMG_TAG) return handleImageTag(element);
        if (element.name === A_TAG) return handleATag(element, options);
      }
    },
  };

  return parse(clean, options);
};

type PostBodyProps = {
  htmlContent: string;
};

// 投稿の本文コンポーネント
const PostBody = ({ htmlContent }: PostBodyProps) => {
  const parsedHtmlContents = parseHTML(htmlContent);
  return (
    <main className="container mx-auto px-5 prose prose-slate lg:prose-xl dark:prose-invert prose-img:rounded-sm prose-a:text-blue-600">
      {parsedHtmlContents}
    </main>
  );
};

export default PostBody;
