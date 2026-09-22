"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import ThemeToggle from "../../components/ThemeToggle";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
// @ts-expect-error - No types available for auto-render
import renderMathInElement from "katex/dist/contrib/auto-render";

export default function TechBlogDetail({ slug, initialBlog }: { slug: string, initialBlog?: any }) {
  const convexBlog = useQuery(api.queries.getTechBlogBySlug, slug ? { slug } : "skip");
  const blog = convexBlog ?? initialBlog;
  const blogs = useQuery(api.queries.getTechBlogs) ?? [];
  const router = useRouter();

  const currentIndex = blogs.findIndex(b => b.slug === slug);
  const previousBlog = currentIndex !== -1 && currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  useEffect(() => {
    if (!blog) return;

    const container = document.querySelector('.journal-body');
    if (!container) return;

    renderMathInElement(container as HTMLElement, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ]
    });

    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        setZoomedImg((target as HTMLImageElement).src);
      }
    };

    container.addEventListener('click', handleImageClick);

    const images = container.querySelectorAll('img');
    images.forEach(img => {
      img.style.cursor = 'zoom-in';
    });

    return () => container.removeEventListener('click', handleImageClick);
  }, [blog]);

  if (!blog) return <div className="card learning-journal-page"><p>Blog not found.</p></div>;

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/tech-blogs" className="cd-back-link">← cd ../tech_blogs</Link>
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
                {blog.headerImage ? (
                  <img src={blog.headerImage} alt={blog.title} style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px", marginBottom: "2rem" }} />
                ) : (
                  <div style={{ width: "100%", height: "400px", background: "var(--hover-bg-color)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", marginBottom: "2rem", border: "1px solid var(--border-color)" }}>
                    <span style={{ color: "var(--subtle-text-color)", fontSize: "2.5rem", fontWeight: "bold", padding: "0 2rem", textAlign: "center" }}>{blog.title}</span>
                  </div>
                )}
                <p className="journal-meta">{blog.date}</p>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{blog.title}</h1>
                {blog.tags && blog.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    {blog.tags.map((tag: string) => (
                      <span key={tag} style={{ background: "var(--hover-bg-color)", border: "1px solid var(--link-color)", color: "var(--link-color)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold" }}>
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
                <Link href={`/tech-blogs/${previousBlog.slug}`} className="cd-back-link" style={{ marginBottom: 0 }}>
                  ← cd ../prev_blog
                </Link>
              ) : <span />}

              {nextBlog ? (
                <Link href={`/tech-blogs/${nextBlog.slug}`} className="cd-back-link" style={{ marginBottom: 0 }}>
                  → cd ../next_blog
                </Link>
              ) : null}
            </div>
          </main>
        </div>
      </div>
      {zoomedImg && (
        <div
          className="image-lightbox-overlay"
          onClick={() => setZoomedImg(null)}
        >
          <img src={zoomedImg} alt="Zoomed" className="image-lightbox-img" />
        </div>
      )}
      <ThemeToggle />
    </>
  );
}
