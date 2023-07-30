import { SITE_DOMAIN } from "@/config";
import Image from "next/image";
import Link from "next/link";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const parseHTML = (htmlContent: string) => {
  const { window } = new JSDOM("");

  // DOMPurifyを使用してHTMLをサニタイズする
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(htmlContent);

  // HTMLをパースする
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        const element = domNode as Element;

        // imgタグの場合、Next.jsのImageコンポーネントを使用する
        if (element.name === "img" && element.attribs && element.attribs.src) {
          // widthとheightが指定されている場合、画像のアスペクト比を維持する
          return element.attribs.height && element.attribs.width ? (
            <Image
              src={element.attribs.src}
              alt={element.attribs.alt || ""}
              width={parseInt(element.attribs.width)}
              height={parseInt(element.attribs.height)}
            />
          ) : (
            // widthとheightが指定されていない場合、layout fillを使用して画像を表示する
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
        if (element.name === "a" && element.attribs && element.attribs.href) {
          const href = element.attribs.href;
          const url = new URL(href, SITE_DOMAIN); // ベースURL
          // 内部リンクの場合、Next.jsのLinkコンポーネントを使用する
          if (url.hostname === "example.com") {
            return (
              <Link href={href}>
                {element.children &&
                  element.children.length > 0 &&
                  domToReact(element.children, options)}
              </Link>
            );
          } else {
            // 外部リンクの場合、target="_blank"を付与する
            return (
              <a href={href} rel="noopener noreferrer" target="_blank">
                {element.children &&
                  element.children.length > 0 &&
                  domToReact(element.children, options)}
              </a>
            );
          }
        }
      }
    },
  };

  return parse(clean, options);
};

type PostBodyProps = {
  htmlContent: string;
};

const PostBody = (props: PostBodyProps) => {
  const { htmlContent } = props;
  const parsedHtmlContents = parseHTML(htmlContent);
  return (
    // TailwindCSSのproseプラグインを使用して、ブログのコンテンツをスタイルする
    <article className="prose prose-slate lg:prose-xl dark:prose-invert prose-img:rounded-sm prose-headings:underline prose-a:text-blue-600">
      {parsedHtmlContents}
    </article>
  );
};

export default PostBody;
