"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProjectCard from "../components/ProjectCard";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function Projects() {
  const projects = useQuery(api.queries.getProjects) || [];

  return (
    <>
      <div className="card">
        <Link href="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        <div className="section">
          <h2>All Projects</h2>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-1rem",
                zIndex: 10,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "2rem",
                borderRadius: "12px",
                background: "rgba(0, 0, 0, 0.05)"
              }}
            >
              <div style={{
                background: "var(--bg-color)",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                border: "1px solid var(--border-color)",
                maxWidth: "500px"
              }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--heading-color)" }}>
                  Temporarily Unavailable :(
                </h3>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "var(--text-color)", margin: 0 }}>
                  Recently Jeffry's AWS charged me $100  gonna migrate all my projects to different cloud provider<br /><br />
                  <strong>Live links will be coming soon!</strong>
                </p>
              </div>
            </div>

            <div id="full-project-list" className="project-grid" style={{ pointerEvents: "none", userSelect: "none" }}>
              {projects.map((project: any) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
