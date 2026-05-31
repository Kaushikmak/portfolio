"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default function GymAdmin() {
  const [activeSubTab, setActiveSubTab] = useState<"activity" | "routine">("activity");

  return (
    <div>
       <div className="year-tabs" style={{ marginBottom: 20 }}>
          <button className={`year-tab ${activeSubTab === "activity" ? "active" : ""}`} onClick={() => setActiveSubTab("activity")}>Activity Logs</button>
          <button className={`year-tab ${activeSubTab === "routine" ? "active" : ""}`} onClick={() => setActiveSubTab("routine")}>Routines</button>
       </div>
       {activeSubTab === "activity" ? <GymActivityAdmin /> : <GymRoutineAdmin />}
    </div>
  );
}

function GymActivityAdmin() {
  const activities = useQuery(api.queries.getGymActivity) ?? [];
  const upsert = useMutation(api.adminMutations.upsertGymActivity);
  const remove = useMutation(api.adminMutations.deleteGymActivity);

  const [selectedId, setSelectedId] = useState<Id<"gymActivity"> | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState<string | null>(null);

  const loadIntoForm = (act: any) => {
    setSelectedId(act._id);
    setDate(act.date);
    setCount(act.count);
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setDate(new Date().toISOString().split("T")[0]);
    setCount(1);
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    await upsert({
      id: selectedId ?? undefined,
      date,
      count: Number(count),
    });
    setStatus("Saved successfully.");
  };

  const handleDelete = async () => {
    if (selectedId && confirm("Are you sure you want to delete this activity log?")) {
      await remove({ id: selectedId });
      resetForNew();
      setStatus("Deleted successfully.");
    }
  };

  return (
    <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
      <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
        <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Activity</button>
        <div className="journal-sidebar-list" style={{ maxHeight: 400, overflowY: "auto" }}>
          {activities.map((act) => (
            <button key={act._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(act)}>
              <strong>{act.date}</strong> (Int: {act.count})
            </button>
          ))}
        </div>
      </aside>

      <main className="journal-main journal-admin-main">
        <div className="journal-admin-form">
          <label>Date (YYYY-MM-DD)<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label>Intensity/Count (1-4)<input type="number" min="1" max="4" value={count} onChange={(e) => setCount(Number(e.target.value))} /></label>
          
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="view-more-button" onClick={save}>Save Activity</button>
            {selectedId && <button className="view-more-button" style={{ borderColor: "red", color: "red" }} onClick={handleDelete}>Delete</button>}
          </div>
          {status && <p style={{ margin: 0, marginTop: 10 }}>{status}</p>}
        </div>
      </main>
    </div>
  );
}

function GymRoutineAdmin() {
  const routines = useQuery(api.queries.getGymRoutines) ?? [];
  const upsert = useMutation(api.adminMutations.upsertGymRoutine);
  const remove = useMutation(api.adminMutations.deleteGymRoutine);

  const [selectedId, setSelectedId] = useState<Id<"gymRoutines"> | null>(null);
  const [day, setDay] = useState("");
  const [exercisesText, setExercisesText] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  const loadIntoForm = (rtn: any) => {
    setSelectedId(rtn._id);
    setDay(rtn.day);
    setExercisesText((rtn.exercises || []).join("\n"));
    setOrder(rtn.order);
    setStatus(null);
  };

  const resetForNew = () => {
    setSelectedId(null);
    setDay("");
    setExercisesText("");
    setOrder(routines.length);
    setStatus(null);
  };

  const save = async () => {
    setStatus(null);
    await upsert({
      id: selectedId ?? undefined,
      day,
      exercises: exercisesText.split("\n").map(e => e.trim()).filter(Boolean),
      order: Number(order),
    });
    setStatus("Saved successfully.");
  };

  const handleDelete = async () => {
    if (selectedId && confirm("Are you sure you want to delete this routine?")) {
      await remove({ id: selectedId });
      resetForNew();
      setStatus("Deleted successfully.");
    }
  };

  return (
    <div className="journal-layout" style={{ padding: 0, marginTop: 12 }}>
      <aside className="journal-sidebar" style={{ paddingLeft: 0 }}>
        <button className="view-more-button" style={{ marginBottom: 12 }} onClick={resetForNew}>+ New Routine</button>
        <div className="journal-sidebar-list">
          {routines.map((rtn) => (
            <button key={rtn._id} className="week-chip" style={{ textAlign: "left", background: "transparent" }} onClick={() => loadIntoForm(rtn)}>
              <strong>{rtn.day}</strong>
            </button>
          ))}
        </div>
      </aside>

      <main className="journal-main journal-admin-main">
        <div className="journal-admin-form">
          <label>Routine Name / Day (e.g. Push)<input value={day} onChange={(e) => setDay(e.target.value)} /></label>
          <label>Exercises (one per line)<textarea rows={6} value={exercisesText} onChange={(e) => setExercisesText(e.target.value)} placeholder="Bench Press: 3x8&#10;Overhead Press: 3x10" /></label>
          <label>Order<input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} /></label>
          
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button className="view-more-button" onClick={save}>Save Routine</button>
            {selectedId && <button className="view-more-button" style={{ borderColor: "red", color: "red" }} onClick={handleDelete}>Delete</button>}
          </div>
          {status && <p style={{ margin: 0, marginTop: 10 }}>{status}</p>}
        </div>
      </main>
    </div>
  );
}
