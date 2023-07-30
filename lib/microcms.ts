import {
  MICROCMS_API_KEY,
  MICROCMS_BLOGS_ENDPOINT,
  MICROCMS_CATEGORIES_ENDPOINT,
  MICROCMS_SERVICE_DOMAIN,
} from "@/config";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

const getContents = async (endpoint: string) => {
  const response = await client.get({ endpoint });
  return response.contents;
};

export const getBlogList = async () => {
  const blogs = await getContents(MICROCMS_BLOGS_ENDPOINT);
  return blogs;
};

export const getCategoryList = async () => {
  const categories = await getContents(MICROCMS_CATEGORIES_ENDPOINT);
  return categories;
};
