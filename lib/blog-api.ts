const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface BlogPostListItem {
  slug: string;
  category: string;
  readTime: number;
  image: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
}

export interface BlogPostDetail {
  slug: string;
  category: string;
  readTime: number;
  image: string;
  date: string;
  author: string;
  meta: { title: string; description: string };
  title: string;
  intro: string;
  sections: BlogSection[];
}

export interface BlogSection {
  key: string;
  type: 'text' | 'list' | 'items';
  title: string;
  content: string;
  list?: string[];
  items?: { subtitle: string; text: string }[];
}

export interface BlogPostsResponse {
  data: BlogPostListItem[];
  total: number;
  page: number;
  limit: number;
}

export async function getBlogPosts(
  locale: string,
  options?: { category?: string; page?: number; limit?: number },
): Promise<BlogPostsResponse> {
  const params = new URLSearchParams({ locale });
  if (options?.category) params.set('category', options.category);
  if (options?.page) params.set('page', String(options.page));
  if (options?.limit) params.set('limit', String(options.limit));

  const res = await fetch(`${API_BASE}/api/blog/posts?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.status}`);
  }

  return res.json();
}

export async function getBlogPost(
  slug: string,
  locale: string,
): Promise<BlogPostDetail | null> {
  const res = await fetch(
    `${API_BASE}/api/blog/posts/${slug}?locale=${locale}`,
    { next: { revalidate: 60 } },
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post: ${res.status}`);
  }

  return res.json();
}

export async function getBlogCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/blog/categories`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  return res.json();
}
