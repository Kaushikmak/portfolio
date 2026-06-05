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
      title: "Blog Not Found | Techbyts",
    };
  }

  // Create a plain text description from content
  const plainTextDescription = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 160) + "..."
    : "Read this tech blog on Techbyts.";

  return {
    title: `${blog.title} | Techbyts`,
    description: plainTextDescription,
    openGraph: {
      title: blog.title,
      description: plainTextDescription,
      type: "article",
      publishedTime: blog.date,
      authors: ["Kaushik"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainTextDescription,
    },
  };
}

export default function Page() {
  return <ClientPage />;
}
