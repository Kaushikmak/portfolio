import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Metadata, ResolvingMetadata } from "next";
import ClientPage from "./ClientPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const blog = await convex.query(api.queries.getTechBlogBySlug, { slug });

  if (!blog) {
    return {
      title: "Blog Not Found | Techbits",
    };
  }

  // Create a plain text description from content
  const plainTextDescription = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..."
    : "Read this tech blog on Techbits.";

  return {
    title: `${blog.title} | Techbits`,
    description: plainTextDescription,
    alternates: {
      canonical: `/tech-blogs/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: plainTextDescription,
      type: "article",
      url: `/tech-blogs/${slug}`,
      publishedTime: blog.date,
      authors: ["Kaushik"],
      siteName: "Techbits by Kaushik Gupta",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainTextDescription,
      creator: "@kaushik_mak",
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const blog = await convex.query(api.queries.getTechBlogBySlug, { slug });

  return <ClientPage slug={slug} initialBlog={blog} />;
}
