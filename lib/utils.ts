export const formatDateJP = (date: string) => {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateBlogDescription = (content: string) => {
  const contentWithoutTag = content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  return contentWithoutTag.slice(0, 100) + "...";
};
