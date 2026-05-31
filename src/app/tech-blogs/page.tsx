"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function TechBlogsPage() {
  const blogs = useQuery(api.queries.getTechBlogs) ?? [];

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        <div className="section journal-header">
          <div className="log-header">
            <h2>Tech Blogs</h2>
            <p className="subtitle" style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }}>
              Quick technical thoughts, snippets, and mini-guides.
            </p>
          </div>
        </div>

        <div className="tech-blogs-grid" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/tech-blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
              <article className="journal-card" style={{ cursor: "pointer", transition: "transform 0.2s ease" }}>
                <div className="journal-content" style={{ padding: "1.5rem" }}>
                  <p className="journal-meta">{blog.date}</p>
                  <h3 style={{ margin: "0.5rem 0", color: "var(--text)" }}>{blog.title}</h3>
                  {blog.summary && <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 1rem 0" }}>{blog.summary}</p>}
                  {blog.tags && blog.tags.length > 0 && (
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      {blog.tags.map(tag => (
                        <span key={tag} style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "2px 8px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="journal-link">Read Blog</span>
                </div>
              </article>
            </Link>
          ))}
          {blogs.length === 0 && <p>No tech blogs yet. Check back soon!</p>}
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
