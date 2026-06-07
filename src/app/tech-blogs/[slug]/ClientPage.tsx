"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TechBlogDetail({ slug, initialBlog }: { slug: string, initialBlog?: any }) {
  const convexBlog = useQuery(api.queries.getTechBlogBySlug, slug ? { slug } : "skip");
  const blog = convexBlog ?? initialBlog;
  const blogs = useQuery(api.queries.getTechBlogs) ?? [];
  const router = useRouter();

  const currentIndex = blogs.findIndex(b => b.slug === slug);
  const previousBlog = currentIndex !== -1 && currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  if (!blog) return <div className="card learning-journal-page"><p>Blog not found.</p></div>;

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/tech-blogs" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Tech Blogs
        </Link>
        <div className="journal-layout" style={{ marginTop: "2rem" }}>
          <aside className="journal-sidebar">
            <h3>Recent Blogs</h3>
            <div className="journal-sidebar-list">
              {blogs.map((b) => (
                <Link key={b._id} href={`/tech-blogs/${b.slug}`} className="week-chip">
                  <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>{b.date}</span>
                  <strong>{b.title}</strong>
                </Link>
              ))}
            </div>
          </aside>

          <main className="journal-main">
            <article className="journal-detail tech-blog-content" style={{ marginTop: 0 }}>
              <div className="journal-header" style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "2rem" }}>
                <p className="journal-meta">{blog.date}</p>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{blog.title}</h1>
                {blog.tags && blog.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    {blog.tags.map((tag: string) => (
                      <span key={tag} style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <section className="journal-body" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            <div className="journal-nav" style={{ marginTop: "3rem" }}>
              {previousBlog ? (
                <Link href={`/tech-blogs/${previousBlog.slug}`} className="journal-nav-btn">
                  &larr; Previous Blog
                </Link>
              ) : <span />}

              {nextBlog ? (
                <Link href={`/tech-blogs/${nextBlog.slug}`} className="journal-nav-btn">
                  Next Blog &rarr;
                </Link>
              ) : null}
            </div>
          </main>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
