import Image from "next/image";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const parseHTML = (htmlContent: string) => {
  const { window } = new JSDOM("");
  const DOMPurify = createDOMPurify(window);

  const clean = DOMPurify.sanitize(htmlContent);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        const element = domNode as Element;
        if (element.name === "img" && element.attribs && element.attribs.src) {
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

  return <div>{parsedHtmlContents}</div>;
};

export default PostBody;
