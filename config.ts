// URL関連
export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.SITE_URL || ""
    : process.env.VERCEL_URL || "http://localhost:3000";
export const SITE_HOSTNAME = process.env.SITE_HOSTNAME || "example.com";

// メタデータ関連
export const SITE_TITLE = process.env.SITE_TITLE || "MicroNext";
export const SITE_DESCRIPTION =
  process.env.SITE_DESCRIPTION ||
  "APPルーター、ISR対応のmicroCMS＆Next.jsのブログテンプレート";
export const SITE_AUTHOR = process.env.SITE_AUTHOR || "Nicolas";
export const SITE_AUTHOR_TWITTER = process.env.SITE_AUTHOR_TWITTER || "@_xkime";
export const SITE_AUTHOR_URL =
  process.env.SITE_AUTHOR_URL || "https://twitter.com/_xkime";
export const SITE_IMAGE = process.env.SITE_IMAGE || "/api/og?title=MicroNext";

// MicroCMS関連
export const MICROCMS_SERVICE_DOMAIN =
  process.env.MICROCMS_SERVICE_DOMAIN || "";
export const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY || "";
export const MICROCMS_BLOGS_ENDPOINT =
  process.env.MICROCMS_BLOGS_ENDPOINT || "blogs";
export const MICROCMS_CATEGORIES_ENDPOINT =
  process.env.MICROCMS_CATEGORIES_ENDPOINT || "categories";

// ISR関連
export const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "secret";
export const REVALIDATE_INTERVAL =
  Number(process.env.REVALIDATE_INTERVAL) || 86400;

// DRAFT関連
export const DRAFT_SECRET = process.env.DRAFT_SECRET || "draft";
