import { getBlogPosts, type BlogPostListItem } from "@/lib/blog-api";
import { BlogSection } from "./BlogSection";

interface Props {
  locale: string;
}

export async function BlogSectionWrapper({ locale }: Props) {
  let posts: BlogPostListItem[] = [];
  try {
    const res = await getBlogPosts(locale, { limit: 3 });
    posts = res.data;
  } catch {
    // API not available — render nothing
  }

  return <BlogSection posts={posts} />;
}
