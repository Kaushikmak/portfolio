"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function TechBlogsPage() {
  const blogs = useQuery(api.queries.getTechBlogs) ?? [];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(b => b.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (b.summary && b.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag ? b.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  return (
    <>
      <div className="card learning-journal-page" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        
        <div className="section journal-header">
          <div className="log-header">
            <h1 className="tech-blogs-title">Tech Blogs</h1>
          </div>
        </div>

        <div className="journal-layout" style={{ marginTop: "3rem", alignItems: "start" }}>
          <aside className="journal-sidebar">
            <h3 style={{ marginBottom: "1rem" }}>Search</h3>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "0.8rem", 
                borderRadius: "8px", 
                border: "1px solid var(--border-color)", 
                background: "transparent", 
                color: "var(--text-color)", 
                marginBottom: "2.5rem",
                fontFamily: "inherit"
              }}
            />

            <h3 style={{ marginBottom: "1rem" }}>Topics</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              <button 
                onClick={() => setSelectedTag(null)}
                className={`year-tab ${!selectedTag ? 'active' : ''}`}
                style={{ fontSize: "0.85rem", padding: "0.4rem 0.9rem" }}
              >
                All
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`year-tab ${selectedTag === tag ? 'active' : ''}`}
                  style={{ fontSize: "0.85rem", padding: "0.4rem 0.9rem" }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </aside>

          <main className="journal-main">
            <div className="tech-blogs-grid" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {filteredBlogs.map((blog) => (
                <Link key={blog._id} href={`/tech-blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
                  <article className="journal-card" style={{ cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
                    <div className="journal-content" style={{ padding: "1.8rem" }}>
                      <p className="journal-meta" style={{ fontSize: "0.9rem" }}>{blog.date}</p>
                      <h2 className="journal-card-title" style={{ margin: "0.8rem 0", color: "var(--heading-color)" }}>{blog.title}</h2>
                      {blog.summary && <p className="journal-summary-text" style={{ color: "var(--subtle-text-color)", margin: "0.5rem 0 1.2rem 0", lineHeight: 1.6 }}>{blog.summary}</p>}
                      {blog.tags && blog.tags.length > 0 && (
                        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                          {blog.tags.map(tag => (
                            <span key={tag} style={{ background: "var(--hover-bg-color)", color: "var(--text-color)", border: "1px solid var(--border-color)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="journal-link" style={{ fontSize: "0.95rem" }}>Read Blog &rarr;</span>
                    </div>
                  </article>
                </Link>
              ))}
              {filteredBlogs.length === 0 && (
                <div style={{ padding: "3rem", textAlign: "center", border: "1px dashed var(--border-color)", borderRadius: "12px" }}>
                  <p style={{ color: "var(--subtle-text-color)", fontSize: "1.1rem" }}>No tech blogs found for your search.</p>
                  <button onClick={() => {setSearchQuery(""); setSelectedTag(null);}} className="view-more-button" style={{ marginTop: "1rem" }}>Clear Filters</button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
