// 日付のフォーマット
export const formatDateJP = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ブログのディスクリプションを生成
export const generateBlogDescription = (content: string) => {
  const contentWithoutTag = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  return contentWithoutTag.slice(0, 100) + "...";
};

// 画像のスタイリング
export const baseStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const faviconStyle = {
  ...baseStyle,
  fontSize: 24,
  background: "black",
  color: "white",
  borderRadius: "100%",
};

export const iconStyle = {
  ...baseStyle,
  fontSize: 24,
  background: "black",
  color: "white",
};

export const opengraphStyle = {
  ...baseStyle,
  fontSize: 128,
  background: "white",
};

export function generateIconStyle(dimensions: {
  width: number;
  height: number;
}) {
  return {
    fontSize: dimensions.width / 1.5,
    background: "black",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };
}
