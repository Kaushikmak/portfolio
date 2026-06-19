"use client";
import "./ProjectCarousel.css";
import "./ProjectsAdmin.css";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAdminToken } from "../AdminTokenProvider";

export default function ProjectsAdmin() {
  const token = useAdminToken();
  const projects = useQuery(api.queries.getProjects) ?? [];
  const upsert = useMutation(api.adminMutations.upsertProject);
  const remove = useMutation(api.adminMutations.deleteProject);

  const [selectedId, setSelectedId] = useState<Id<"projects"> | null>(null);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [image, setImage] = useState("");
  const [customIcon, setCustomIcon] = useState("");
  const [tags, setTags] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  const loadIntoForm = (proj: any) => {
    setSelectedId(proj._id);
    setProjectId(proj.projectId);
    setTitle(proj.title);
    setDescription(proj.description);
    setGithub(proj.github);
    setLive(proj.live);
    setImage(proj.image || "");
    setCustomIcon(proj.customIcon || "");
    setTags((proj.tags || []).join(", "));
    setOrder(proj.order);
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setProjectId("");
    setTitle("");
    setDescription("");
    setGithub("");
    setLive("");
    setImage("");
    setCustomIcon("");
    setTags("");
    setOrder(projects.length);
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    await upsert({
      token,
      id: selectedId ?? undefined,
      projectId,
      title,
      description,
      github,
      live,
      image: image || undefined,
      customIcon: customIcon || undefined,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      order: Number(order),
    });
    setStatus("Saved successfully.");
  };

  const handleDelete = async () => {
    if (selectedId && confirm("Are you sure you want to delete this project?")) {
      await remove({ id: selectedId, token });
      resetForNew();
      setStatus("Deleted successfully.");
    }
  };

  return (
    <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
      <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
        <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Project</button>
        <div className="journal-sidebar-list">
          {projects.map((proj) => (
            <button key={proj._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(proj)}>
              <strong>{proj.title}</strong>
            </button>
          ))}
        </div>
      </aside>

      <main className="journal-main journal-admin-main">
        <div className="journal-admin-form">
          <label>Project ID (slug)<input value={projectId} onChange={(e) => setProjectId(e.target.value)} /></label>
          <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>Description<textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
          <label>GitHub URL<input value={github} onChange={(e) => setGithub(e.target.value)} /></label>
          <label>Live URL<input value={live} onChange={(e) => setLive(e.target.value)} /></label>
          <label>Image URL (optional)<input value={image} onChange={(e) => setImage(e.target.value)} /></label>
          <label>Custom SVG Icon (HTML markup)<textarea rows={4} value={customIcon} onChange={(e) => setCustomIcon(e.target.value)} placeholder="<svg ...></svg>" /></label>
          <label>Tags (comma separated)<input value={tags} onChange={(e) => setTags(e.target.value)} /></label>
          <label>Order<input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} /></label>
          
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="view-more-button" onClick={save}>Save Project</button>
            {selectedId && <button className="view-more-button" style={{ borderColor: "red", color: "red" }} onClick={handleDelete}>Delete</button>}
          </div>
          {status && <p style={{ margin: 0, marginTop: 10 }}>{status}</p>}
        </div>

        <section className="journal-live-preview">
          <h3>Live Preview</h3>
          <div className="project-card" style={{ maxWidth: 300, minWidth: 300, background: "var(--bg-color)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
              <div className="project-image-container" style={{ height: 160, background: "var(--hover-bg-color)" }}>
                 {image && <img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={title} />}
                 {!image && customIcon && <div className="custom-icon-wrapper" dangerouslySetInnerHTML={{ __html: customIcon }} />}
              </div>
             <div className="project-content" style={{ padding: "1.2rem" }}>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{title || "Project Title"}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--subtle-text-color)", margin: "0 0 1rem 0" }}>{description || "Description..."}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {tags.split(",").filter(Boolean).map((t, i) => <span key={i} style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", background: "var(--hover-bg-color)", borderRadius: 4 }}>{t.trim()}</span>)}
                </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
