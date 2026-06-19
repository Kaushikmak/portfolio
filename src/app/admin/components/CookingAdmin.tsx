"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAdminToken } from "../AdminTokenProvider";

export default function CookingAdmin() {
  const token = useAdminToken();
  const logs = useQuery(api.queries.getCookingLogs) ?? [];
  const upsert = useMutation(api.adminMutations.upsertCookingLog);
  const remove = useMutation(api.adminMutations.deleteCookingLog);

  const [selectedId, setSelectedId] = useState<Id<"cookingLogs"> | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  const loadIntoForm = (log: any) => {
    setSelectedId(log._id);
    setTitle(log.title);
    setDescription(log.description);
    setImage(log.image);
    setOrder(log.order);
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setTitle("");
    setDescription("");
    setImage("");
    setOrder(logs.length);
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    await upsert({
      token,
      id: selectedId ?? undefined,
      title,
      description,
      image,
      order: Number(order),
    });
    setStatus("Saved successfully.");
  };

  const handleDelete = async () => {
    if (selectedId && confirm("Are you sure you want to delete this recipe?")) {
      await remove({ id: selectedId, token });
      resetForNew();
      setStatus("Deleted successfully.");
    }
  };

  return (
    <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
      <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
        <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Recipe</button>
        <div className="journal-sidebar-list">
          {logs.map((log) => (
            <button key={log._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(log)}>
              <strong>{log.title}</strong>
            </button>
          ))}
        </div>
      </aside>

      <main className="journal-main journal-admin-main">
        <div className="journal-admin-form">
          <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label>Description<textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
          <label>Image URL/Path<input value={image} onChange={(e) => setImage(e.target.value)} /></label>
          <label>Order<input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} /></label>
          
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="view-more-button" onClick={save}>Save Recipe</button>
            {selectedId && <button className="view-more-button" style={{ borderColor: "red", color: "red" }} onClick={handleDelete}>Delete</button>}
          </div>
          {status && <p style={{ margin: 0, marginTop: 10 }}>{status}</p>}
        </div>

        <section className="journal-live-preview">
          <h3>Live Preview</h3>
          <div className="recipe-card" style={{ maxWidth: 400 }}>
            {image && <img src={image} alt={title} className="recipe-img" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />}
            <h3 className="recipe-title" style={{ marginTop: 10 }}>{title || "Recipe Title"}</h3>
            <p className="recipe-desc">{description || "Description..."}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
