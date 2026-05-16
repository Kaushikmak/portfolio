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
          <div id="full-project-list" className="project-grid">
            {projects.map((project: any) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
