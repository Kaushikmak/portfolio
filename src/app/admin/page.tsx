"use client";

import { useState } from "react";
import Link from "next/link";
import LearningAdmin from "./components/LearningAdmin";
import ProjectsAdmin from "./components/ProjectsAdmin";
import CookingAdmin from "./components/CookingAdmin";
import GymAdmin from "./components/GymAdmin";
import TechBlogsAdmin from "./components/TechBlogsAdmin";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"learning" | "tech" | "projects" | "cooking" | "gym">("learning");

  const logout = async () => {
    await fetch("/api/admin-auth/logout", { method: "POST" });
    window.location.href = "/admin-login";
  };

  return (
    <div className="card learning-journal-page learning-admin-page">
      <div className="section" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Unified Admin Dashboard</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/" className="view-more-button">View Site</Link>
            <button className="view-more-button" onClick={logout}>Sign Out</button>
          </div>
        </div>

        <div className="year-tabs" style={{ marginTop: 20, marginBottom: 20 }}>
          <button className={`year-tab ${activeTab === "learning" ? "active" : ""}`} onClick={() => setActiveTab("learning")}>Learning Logs</button>
          <button className={`year-tab ${activeTab === "tech" ? "active" : ""}`} onClick={() => setActiveTab("tech")}>Tech Blogs</button>
          <button className={`year-tab ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>Projects</button>
          <button className={`year-tab ${activeTab === "cooking" ? "active" : ""}`} onClick={() => setActiveTab("cooking")}>Cooking Feed</button>
          <button className={`year-tab ${activeTab === "gym" ? "active" : ""}`} onClick={() => setActiveTab("gym")}>Gym Feed</button>
        </div>

        {activeTab === "learning" && <LearningAdmin />}
        {activeTab === "tech" && <TechBlogsAdmin />}
        {activeTab === "projects" && <ProjectsAdmin />}
        {activeTab === "cooking" && <CookingAdmin />}
        {activeTab === "gym" && <GymAdmin />}
      </div>
    </div>
  );
}
