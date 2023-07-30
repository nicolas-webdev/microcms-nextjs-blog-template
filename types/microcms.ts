export type BlogPostList = BlogPost[];

export type BlogPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category;
};

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type CategoryList = Category[];
