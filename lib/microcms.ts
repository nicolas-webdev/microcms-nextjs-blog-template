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

export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

const handleError = (message: string, error?: any): never => {
  if (error) {
    console.error(message, error);
    throw error;
  } else {
    throw new Error(message);
  }
};

const getContents = async (endpoint: string) => {
  try {
    const response = await client.get({ endpoint });
    return response.contents;
  } catch (error) {
    return handleError(
      `エンドポイント${endpoint}からのデータ取得に失敗しました。`,
      error
    );
  }
};

const fetchByFilter = async (endpoint: string, filter: string) => {
  try {
    return await client.get({
      endpoint,
      queries: { filters: filter },
    });
  } catch (error) {
    handleError("フィルタによるデータ取得に失敗しました。", error);
  }
};

export const getBlogList = async (): Promise<BlogPostList> => {
  return getContents(MICROCMS_BLOGS_ENDPOINT);
};

export const getCategoryList = async (): Promise<CategoryList> => {
  return getContents(MICROCMS_CATEGORIES_ENDPOINT);
};

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  const blogs = await fetchByFilter(
    MICROCMS_BLOGS_ENDPOINT,
    `slug[equals]${slug}`
  );
  if (blogs.contents.length > 0) {
    return blogs.contents[0];
  }

  // ブログが見つからない場合、contentIdを使って再試行
  const blog = await client.get({
    endpoint: MICROCMS_BLOGS_ENDPOINT,
    contentId: slug,
  });
  if (blog) {
    return blog;
  }

  // 対応するブログが見つからない場合、エラーをスロー
  throw new Error(`指定のブログが見つかりません: ${slug}`);
}

export async function getCategoryByName(name: string): Promise<Category> {
  const categories = await fetchByFilter(
    MICROCMS_CATEGORIES_ENDPOINT,
    `name[equals]${name}`
  );
  if (categories.contents.length > 0) {
    return categories.contents[0];
  } else {
    throw new Error(`指定のカテゴリが見つかりません: ${name}`);
  }
}

export async function getBlogListByCategoryName(
  name: string
): Promise<BlogPostList> {
  const category = await getCategoryByName(name);
  const blogs = await fetchByFilter(
    MICROCMS_BLOGS_ENDPOINT,
    `category[equals]${category.id}`
  );
  if (blogs.contents.length === 0) {
    throw new Error(
      `カテゴリ「${name}」に関連するブログが見つかりませんでした。`
    );
  }
  return blogs.contents;
}

export const getPreviewBlog = async (id: string, draftKey: string) => {
  try {
    const response = await fetch(
      `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${MICROCMS_BLOGS_ENDPOINT}/${id}?draftKey=${draftKey}`,
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
    handleError("ブログの取得に失敗しました。", error);
  }
};
