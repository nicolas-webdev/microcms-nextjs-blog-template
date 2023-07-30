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

const getContents = async (endpoint: string) => {
  const response = await client.get({ endpoint });
  return response.contents;
};

export const getBlogList = async (): Promise<BlogPostList> => {
  const blogs = await getContents(MICROCMS_BLOGS_ENDPOINT);
  return blogs;
};

export const getCategoryList = async (): Promise<CategoryList> => {
  const categories = await getContents(MICROCMS_CATEGORIES_ENDPOINT);
  return categories;
};

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  try {
    const blogs = await client.get({
      endpoint: MICROCMS_BLOGS_ENDPOINT,
      queries: { filters: `slug[equals]${slug}` },
    });
    return blogs.contents[0];
  } catch (error) {
    console.error("指定のブログの取得に失敗しました。", error);
    throw error;
  }
}

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
