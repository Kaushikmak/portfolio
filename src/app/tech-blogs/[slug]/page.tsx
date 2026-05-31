"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TechBlogDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const blog = useQuery(api.queries.getTechBlogBySlug, slug ? { slug } : "skip");
  const router = useRouter();

  if (blog === undefined) return <div className="card learning-journal-page"><p>Loading...</p></div>;
  if (blog === null) return <div className="card learning-journal-page"><p>Blog not found.</p></div>;

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/tech-blogs" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Tech Blogs
        </Link>
        <article className="journal-detail tech-blog-content" style={{ marginTop: "2rem" }}>
          <div className="journal-header" style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
            <p className="journal-meta">{blog.date}</p>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{blog.title}</h1>
            {blog.tags && blog.tags.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {blog.tags.map(tag => (
                  <span key={tag} style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <section className="journal-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
      <ThemeToggle />
    </>
  );
}
