"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Editor from "@monaco-editor/react";
import { useAdminToken } from "../AdminTokenProvider";
import "katex/dist/katex.min.css";
// @ts-expect-error - No types available for auto-render
import renderMathInElement from "katex/dist/contrib/auto-render";

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
  const token = useAdminToken();
  const blogs = useQuery(api.techBlogsAdmin.listAllTechBlogs) ?? [];
  const upsert = useMutation(api.techBlogsAdmin.upsertTechBlog);
  const deleteBlog = useMutation(api.techBlogsAdmin.deleteTechBlog);
  const generateUploadUrl = useMutation(api.techBlogsAdmin.generateUploadUrl);
  const convex = useConvex();

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

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showXDialog, setShowXDialog] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editorRef, setEditorRef] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    const container = document.querySelector('.journal-live-preview .journal-body');
    if (!container) return;
    
    renderMathInElement(container as HTMLElement, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ]
    });
  }, [content, title, summary, date]);

  const insertHtml = (htmlSnippet: string) => {
    if (editorRef) {
      const selection = editorRef.getSelection();
      const id = { major: 1, minor: 1 };
      const op = { identifier: id, range: selection, text: htmlSnippet, forceMoveMarkers: true };
      editorRef.executeEdits("my-source", [op]);
      setContent(editorRef.getValue());
      editorRef.focus();
    } else {
      setContent((prev) => prev + "\n" + htmlSnippet);
    }
  };

  const handleAddImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;
    insertHtml(`<img src="${mediaUrl}" alt="Blog Image" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />`);
    setShowImageDialog(false);
    setMediaUrl("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const postUrl = await generateUploadUrl({ token });
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      
      const { storageId } = await result.json();
      
      const url = await convex.query(api.techBlogsAdmin.getFileUrl, { storageId });
      if (url) {
        setMediaUrl(url);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;
    insertHtml(`<video controls src="${mediaUrl}" style="max-width: 100%; border-radius: 8px; margin: 16px 0;"></video>`);
    setShowVideoDialog(false);
    setMediaUrl("");
  };

  const handleAddXPost = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mediaUrl) return;
    insertHtml(`<blockquote class="twitter-tweet"><a href="${mediaUrl}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`);
    setShowXDialog(false);
    setMediaUrl("");
  };

  const closeMediaDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowImageDialog(false);
    setShowVideoDialog(false);
    setShowXDialog(false);
    setMediaUrl("");
  };

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
      token,
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
      await deleteBlog({ id: selectedId, token });
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
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 8 }}>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ width: "auto" }} />
            Published
          </label>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <label style={{ margin: 0 }}>HTML Content</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="button" className="view-more-button" style={{ padding: "4px 8px", fontSize: "0.85rem", background: "transparent", color: "var(--text-color, white)" }} onClick={(e) => { e.preventDefault(); setShowImageDialog(true); }}>+ Image</button>
                <button type="button" className="view-more-button" style={{ padding: "4px 8px", fontSize: "0.85rem", background: "transparent", color: "var(--text-color, white)" }} onClick={(e) => { e.preventDefault(); setShowVideoDialog(true); }}>+ Video</button>
                <button type="button" className="view-more-button" style={{ padding: "4px 8px", fontSize: "0.85rem", background: "transparent", color: "var(--text-color, white)" }} onClick={(e) => { e.preventDefault(); setShowXDialog(true); }}>+ X Post</button>
              </div>
            </div>
            <div style={{ height: "600px", border: "1px solid var(--border-color, #333)", borderRadius: "8px", overflow: "hidden" }}>
              <Editor
                height="100%"
                defaultLanguage="html"
                theme="vs-dark"
                value={content}
                onChange={(val) => setContent(val || "")}
                onMount={handleEditorDidMount}
                options={{
                  wordWrap: "on",
                  minimap: { enabled: false },
                  formatOnPaste: true,
                  tabSize: 2,
                  padding: { top: 16, bottom: 16 }
                }}
              />
            </div>
          </div>
          
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
          <div className="card" style={{ maxWidth: "400px", width: "90%", textAlign: "center", margin: 0, padding: "24px", position: "relative", background: "var(--bg-color)", border: "1px solid var(--border-color)", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
            <h3 style={{ marginTop: 0, fontSize: "1.5rem" }}>Delete Blog?</h3>
            <p style={{ color: "var(--subtle-text-color, #888)", marginBottom: "24px" }}>Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button type="button" className="view-more-button" style={{ background: "transparent", color: "var(--text-color, white)", flex: 1 }} onClick={cancelDelete}>Cancel</button>
              <button type="button" className="view-more-button" style={{ background: "#ff4444", color: "white", borderColor: "#ff4444", flex: 1 }} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {(showImageDialog || showVideoDialog || showXDialog) && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div className="card" style={{ maxWidth: "400px", width: "90%", margin: 0, padding: "24px", position: "relative", background: "var(--bg-color)", border: "1px solid var(--border-color)", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
            <h3 style={{ marginTop: 0, fontSize: "1.2rem", marginBottom: "8px" }}>
              {showImageDialog ? "Insert Image" : showVideoDialog ? "Insert Video" : "Insert X (Twitter) Post"}
            </h3>
            <p style={{ color: "var(--subtle-text-color, #888)", marginBottom: "16px", fontSize: "0.9rem" }}>
              {showImageDialog 
                ? "Paste an image URL below, or upload one from your device."
                : showVideoDialog
                ? "Paste a video URL below, or upload one from your device."
                : "Paste the URL below. For X posts, paste the full link to the tweet."}
            </p>
            
            <input 
              type="text" 
              placeholder="https://..." 
              value={mediaUrl} 
              onChange={(e) => setMediaUrl(e.target.value)} 
              style={{ width: "100%", marginBottom: "16px", padding: "12px", background: "var(--bg-color)", color: "var(--text-color)", border: "1px solid var(--border-color)", borderRadius: "8px" }}
              autoFocus
            />

            {(showImageDialog || showVideoDialog) && (
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                <input 
                  type="file" 
                  accept={showImageDialog ? "image/*" : "video/*"}
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <button 
                  type="button" 
                  className="view-more-button" 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ flex: 1, background: "var(--bg-color)", border: "1px dashed var(--border-color)", color: "var(--text-color)" }}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload from Device"}
                </button>
              </div>
            )}
            
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: (!showImageDialog && !showVideoDialog) ? "24px" : "0", width: "100%" }}>
              <button type="button" className="view-more-button" style={{ background: "transparent", color: "var(--text-color)" }} onClick={closeMediaDialog}>Cancel</button>
              <button type="button" className="view-more-button" onClick={showImageDialog ? handleAddImage : showVideoDialog ? handleAddVideo : handleAddXPost} disabled={!mediaUrl && !isUploading}>Insert</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
