import {
  MICROCMS_API_KEY,
  MICROCMS_BLOGS_ENDPOINT,
  MICROCMS_CATEGORIES_ENDPOINT,
  MICROCMS_SERVICE_DOMAIN,
} from "@/config";
import {
  BlogPost,
  BlogPostList,
  Category,
  CategoryList,
} from "@/types/microcms";
import { createClient } from "microcms-js-sdk";

// microCMSのクライアントを生成
// serviceDomainとapiKeyは環境変数から取得
export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

// エンドポイントからコンテンツを取得する関数
const getContents = async (endpoint: string) => {
  try {
    const response = await client.get({ endpoint });
    return response.contents;
  } catch (error) {
    console.error(
      `エンドポイント${endpoint}からのデータ取得に失敗しました。`,
      error
    );
    throw error;
  }
};

// ブログ一覧を取得
export const getBlogList = async (): Promise<BlogPostList> => {
  return getContents(MICROCMS_BLOGS_ENDPOINT);
};

// カテゴリ一覧を取得
export const getCategoryList = async (): Promise<CategoryList> => {
  return getContents(MICROCMS_CATEGORIES_ENDPOINT);
};

// スラッグにより特定のブログを取得
export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  try {
    const blogs = await client.get({
      endpoint: MICROCMS_BLOGS_ENDPOINT,
      queries: { filters: `slug[equals]${slug}` },
    });
    // ブログが見つからない場合、contentIdを使用して再試行
    if (blogs.contents.length === 0) {
      const blog = await client.get({
        endpoint: MICROCMS_BLOGS_ENDPOINT,
        contentId: slug,
      });
      return blog;
    }
    return blogs.contents[0];
  } catch (error) {
    console.error("指定のブログの取得に失敗しました。", error);
    throw error;
  }
}

// 名前により特定のカテゴリを取得
export async function getCategoryByName(name: string): Promise<Category> {
  try {
    const categories = await client.get({
      endpoint: MICROCMS_CATEGORIES_ENDPOINT,
      queries: { filters: `name[equals]${name}` },
    });
    return categories.contents[0];
  } catch (error) {
    console.error("指定のカテゴリの取得に失敗しました。", error);
    throw error;
  }
}

// カテゴリ名によりブログ一覧を取得
export async function getBlogListByCategoryName(
  name: string
): Promise<BlogPostList> {
  try {
    const category = await getCategoryByName(name);
    const blogs = await client.get({
      endpoint: MICROCMS_BLOGS_ENDPOINT,
      queries: { filters: `category[equals]${category.id}` },
    });
    return blogs.contents;
  } catch (error) {
    console.error("指定のカテゴリのブログ一覧の取得に失敗しました。", error);
    throw error;
  }
}

// プレビュー用のブログを取得
export const getPreviewBlog = async (id: string, draftKey: string) => {
  try {
    const response = await fetch(
      ` https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${MICROCMS_BLOGS_ENDPOINT}/${id}?draftKey=${draftKey}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("ブログの取得に失敗しました。");
    }
    const blog: BlogPost = await response.json();
    return blog;
  } catch (error) {
    console.error("ブログの取得に失敗しました。", error);
    throw error;
  }
};
