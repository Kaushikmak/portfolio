"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type TechBlog = {
  _id: Id<"techBlogs">;
  title: string;
  summary?: string;
  content: string;
  date: string;
  slug: string;
  tags?: string[];
  isPublished?: boolean;
};

export default function TechBlogsAdmin() {
  const blogs = useQuery(api.techBlogsAdmin.listAllTechBlogs) ?? [];
  const upsert = useMutation(api.techBlogsAdmin.upsertTechBlog);
  const deleteBlog = useMutation(api.techBlogsAdmin.deleteTechBlog);

  const [selectedId, setSelectedId] = useState<Id<"techBlogs"> | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("<p></p>\n\n<pre><code>\nconsole.log('hello world');\n</code></pre>");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadIntoForm = (blog: TechBlog) => {
    setSelectedId(blog._id);
    setTitle(blog.title || "");
    setSummary(blog.summary || "");
    setContent(blog.content || "");
    setDate(blog.date || "");
    setSlug(blog.slug || "");
    setTags((blog.tags ?? []).join(", "));
    setIsPublished(blog.isPublished ?? true);
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setTitle("");
    setSummary("");
    setContent("<p></p>\n\n<pre><code>\nconsole.log('hello world');\n</code></pre>");
    setDate(new Date().toISOString().split("T")[0]);
    setSlug("");
    setTags("");
    setIsPublished(true);
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    await upsert({
      existingId: selectedId ?? undefined,
      title,
      summary: summary || undefined,
      content,
      date,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
      isPublished,
    });
    setStatus("Saved successfully.");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedId) setShowDeleteConfirm(true);
  };

  const confirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedId) {
      await deleteBlog({ id: selectedId });
      setShowDeleteConfirm(false);
      resetForNew();
      setStatus("Deleted successfully.");
    }
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
      <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
        <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Tech Blog</button>
        <div className="journal-sidebar-list">
          {blogs.map((blog) => (
            <button key={blog._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(blog as TechBlog)}>
              <span>{blog.date}</span>
              <strong>{blog.title}</strong>
              {!blog.isPublished && <span style={{ fontSize: "0.8em", color: "var(--primary)" }}> (Draft)</span>}
            </button>
          ))}
        </div>
      </aside>

      <main className="journal-main journal-admin-main">
        <div className="journal-admin-form">
          <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>Slug<input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-if-empty" /></label>
          <label>Summary<input value={summary} onChange={(e) => setSummary(e.target.value)} /></label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8 }}>
            <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label>Tags (comma separated)<input value={tags} onChange={(e) => setTags(e.target.value)} /></label>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ width: "auto" }} />
            Published
          </label>
          <label>HTML Content<textarea rows={16} value={content} onChange={(e) => setContent(e.target.value)} /></label>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" className="view-more-button" onClick={(e) => { e.preventDefault(); save(); }}>Save Blog</button>
            {selectedId && <button type="button" className="view-more-button" style={{ background: "red", color: "white", borderColor: "red" }} onClick={handleDeleteClick}>Delete</button>}
          </div>
          {status && <p style={{ margin: 0 }}>{status}</p>}
        </div>

        <section className="journal-live-preview">
          <h3>Live Preview</h3>
          <article className="journal-detail tech-blog-content">
            <p className="journal-meta">{date}</p>
            <h1>{title || "Untitled Blog"}</h1>
            {summary && <p className="journal-summary">{summary}</p>}
            <section className="journal-body" dangerouslySetInnerHTML={{ __html: content || "<p></p>" }} />
          </article>
        </section>
      </main>

      {showDeleteConfirm && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div className="card" style={{ maxWidth: "400px", width: "90%", textAlign: "center", margin: 0, padding: "24px", position: "relative" }}>
            <h3 style={{ marginTop: 0, fontSize: "1.5rem" }}>Delete Blog?</h3>
            <p style={{ color: "var(--subtle-text-color, #888)", marginBottom: "24px" }}>Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button type="button" className="view-more-button" style={{ background: "transparent", color: "var(--text-color, white)", flex: 1 }} onClick={cancelDelete}>Cancel</button>
              <button type="button" className="view-more-button" style={{ background: "#ff4444", color: "white", borderColor: "#ff4444", flex: 1 }} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
