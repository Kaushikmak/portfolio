"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";

type WeeklyLog = {
  _id: Id<"learningLogs">;
  title: string;
  summary?: string;
  content: string;
  year?: number;
  weekNumber?: number;
  weekSlug?: string;
  weekStartDate?: string;
  weekEndDate?: string;
  coverImage?: string;
  tags?: string[];
  galleryImages?: { src: string; alt: string; caption?: string }[];
};

export default function LearningAdminPage() {
  const logs = useQuery(api.learningAdmin.listAllWeeklyLogs) ?? [];
  const upsert = useMutation(api.learningAdmin.upsertWeeklyLog);

  const [selectedId, setSelectedId] = useState<Id<"learningLogs"> | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("<h4>What Happened</h4><p></p>");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [weekNumber, setWeekNumber] = useState("1");
  const [weekSlug, setWeekSlug] = useState("week-1");
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [galleryJson, setGalleryJson] = useState("[]");
  const [status, setStatus] = useState<string | null>(null);

  let previewGallery: { src: string; alt: string; caption?: string }[] = [];
  let previewGalleryError = "";
  try {
    const parsed = JSON.parse(galleryJson || "[]");
    if (Array.isArray(parsed)) {
      previewGallery = parsed;
    } else {
      previewGalleryError = "Gallery preview unavailable: JSON must be an array.";
    }
  } catch {
    previewGalleryError = "Gallery preview unavailable: invalid JSON.";
  }

  const loadIntoForm = (log: WeeklyLog) => {
    setSelectedId(log._id);
    setTitle(log.title || "");
    setSummary(log.summary || "");
    setContent(log.content || "");
    setYear(String(log.year ?? new Date().getFullYear()));
    setWeekNumber(String(log.weekNumber ?? 1));
    setWeekSlug(log.weekSlug ?? `week-${log.weekNumber ?? 1}`);
    setWeekStartDate(log.weekStartDate ?? "");
    setWeekEndDate(log.weekEndDate ?? "");
    setCoverImage(log.coverImage ?? "");
    setTags((log.tags ?? []).join(", "));
    setGalleryJson(JSON.stringify(log.galleryImages ?? [], null, 2));
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setTitle("");
    setSummary("");
    setContent("<h4>What Happened</h4><p></p>");
    setYear(String(new Date().getFullYear()));
    setWeekNumber("1");
    setWeekSlug("week-1");
    setWeekStartDate("");
    setWeekEndDate("");
    setCoverImage("");
    setTags("");
    setGalleryJson("[]");
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    let gallery: { src: string; alt: string; caption?: string }[] = [];
    try {
      gallery = JSON.parse(galleryJson || "[]");
      if (!Array.isArray(gallery)) throw new Error("gallery must be an array");
    } catch {
      setStatus("Gallery JSON is invalid.");
      return;
    }

    await upsert({
      existingId: selectedId ?? undefined,
      logId: `week-${weekNumber}-${year}`,
      title,
      summary: summary || undefined,
      content,
      year: Number(year),
      weekNumber: Number(weekNumber),
      weekSlug,
      weekStartDate,
      weekEndDate,
      coverImage: coverImage || undefined,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
      galleryImages: gallery.length > 0 ? gallery : undefined,
      isPublished: true,
    });

    setStatus("Saved successfully.");
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const onCoverUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setCoverImage(dataUrl);
      setStatus("Cover image uploaded to form.");
    } catch {
      setStatus("Failed to upload cover image.");
    }
  };

  const onGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const existing = JSON.parse(galleryJson || "[]");
      const current = Array.isArray(existing) ? existing : [];
      const additions: { src: string; alt: string; caption?: string }[] = [];
      for (const file of Array.from(files)) {
        const dataUrl = await fileToDataUrl(file);
        additions.push({
          src: dataUrl,
          alt: file.name,
          caption: "",
        });
      }
      setGalleryJson(JSON.stringify([...current, ...additions], null, 2));
      setStatus("Gallery images uploaded to form.");
    } catch {
      setStatus("Failed to upload one or more gallery images.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin-auth/logout", { method: "POST" });
    window.location.href = "/learning/admin-login";
  };

  return (
    <div className="card learning-journal-page learning-admin-page" style={{ padding: 0, marginTop: 0 }}>
      <div className="section" style={{ width: "100%", marginTop: 0, padding: 0 }}>

        <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
          <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
            <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Week</button>
            <div className="journal-sidebar-list">
              {logs.map((log) => (
                <button key={log._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(log as WeeklyLog)}>
                  <span>W{log.weekNumber} • {log.year}</span>
                  <strong>{log.title}</strong>
                </button>
              ))}
            </div>
          </aside>

          <main className="journal-main journal-admin-main">
            <div className="journal-admin-form">
              <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
              <label>Summary<input value={summary} onChange={(e) => setSummary(e.target.value)} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8 }}>
                <label>Year<input value={year} onChange={(e) => setYear(e.target.value)} /></label>
                <label>Week #<input value={weekNumber} onChange={(e) => setWeekNumber(e.target.value)} /></label>
                <label>Week Slug<input value={weekSlug} onChange={(e) => setWeekSlug(e.target.value)} /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8 }}>
                <label>Week Start<input type="date" value={weekStartDate} onChange={(e) => setWeekStartDate(e.target.value)} /></label>
                <label>Week End<input type="date" value={weekEndDate} onChange={(e) => setWeekEndDate(e.target.value)} /></label>
              </div>
              <label>Cover Image Path<input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="/assets/week20/cover.jpg" /></label>
              <label>
                Upload Cover Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => void onCoverUpload(e.target.files?.[0] ?? null)}
                />
              </label>
              <label>Tags (comma separated)<input value={tags} onChange={(e) => setTags(e.target.value)} /></label>
              <label>Gallery JSON<textarea rows={8} value={galleryJson} onChange={(e) => setGalleryJson(e.target.value)} /></label>
              <label>
                Upload Gallery Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => void onGalleryUpload(e.target.files)}
                />
              </label>
              <label>HTML Content<textarea rows={16} value={content} onChange={(e) => setContent(e.target.value)} /></label>
              <button className="view-more-button" onClick={save}>Save Week</button>
              {status && <p style={{ margin: 0 }}>{status}</p>}
            </div>

            <section className="journal-live-preview">
              <h3>Live Preview</h3>
              <article className="journal-detail">
                {coverImage && (
                  <Image
                    src={coverImage}
                    alt={title || "Weekly cover"}
                    width={1200}
                    height={675}
                    className="journal-detail-cover"
                  />
                )}
                <p className="journal-meta">
                  Week {weekNumber || "?"}, {year || "?"} • {weekStartDate || "YYYY-MM-DD"} to {weekEndDate || "YYYY-MM-DD"}
                </p>
                <h1>{title || "Untitled Week"}</h1>
                {summary && <p className="journal-summary">{summary}</p>}
                <section className="journal-body" dangerouslySetInnerHTML={{ __html: content || "<p></p>" }} />

                {previewGalleryError && <p className="journal-preview-error">{previewGalleryError}</p>}

                {previewGallery.length > 0 && (
                  <section className="journal-gallery">
                    <h2>Week Gallery</h2>
                    <div className="journal-gallery-grid">
                      {previewGallery.map((image, idx) => (
                        <figure key={`${image.src}-${idx}`} className="journal-gallery-item">
                          <Image src={image.src} alt={image.alt || `Gallery image ${idx + 1}`} width={1200} height={900} />
                          {image.caption && <figcaption>{image.caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
