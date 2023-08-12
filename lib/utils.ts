// ユーティリティ関数とスタイルを定義

// 日付を日本のフォーマットに変換
export const formatDateJP = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// HTMLタグを除去し、ブログの説明文を生成
export const generateBlogDescription = (content: string) => {
  const contentWithoutTag = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  return `${contentWithoutTag.slice(0, 100)}...`;
};

// ベーススタイル
const baseStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// faviconのスタイル
export const faviconStyle = {
  ...baseStyle,
  fontSize: 24,
  background: "black",
  color: "white",
  borderRadius: "100%",
};

// 通常のアイコンスタイル
export const iconStyle = {
  ...baseStyle,
  fontSize: 24,
  background: "black",
  color: "white",
};

// OpenGraphのアイコンスタイル
export const opengraphStyle = {
  ...baseStyle,
  fontSize: 128,
  background: "white",
};

// アイコンスタイルを動的に生成
export const generateIconStyle = (dimensions: {
  width: number;
  height: number;
}) => ({
  ...baseStyle,
  fontSize: dimensions.width / 1.5,
  background: "black",
  color: "white",
});
