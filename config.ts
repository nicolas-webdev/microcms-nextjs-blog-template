// URL関連
export const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
export const SITE_HOSTNAME = process.env.SITE_HOSTNAME || "example.com";

// メタデータ関連
export const SITE_TITLE = process.env.SITE_TITLE || "MicroNext";
export const SITE_DESCRIPTION =
  process.env.SITE_DESCRIPTION ||
  "APPルーター、ISR対応のmicroCMS＆Next.jsのブログテンプレート";

// MicroCMS関連
export const MICROCMS_SERVICE_DOMAIN =
  process.env.MICROCMS_SERVICE_DOMAIN || "";
export const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY || "";
export const MICROCMS_BLOGS_ENDPOINT =
  process.env.MICROCMS_BLOGS_ENDPOINT || "blogs";
export const MICROCMS_CATEGORIES_ENDPOINT =
  process.env.MICROCMS_CATEGORIES_ENDPOINT || "categories";
