"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProfileCard from "./components/ProfileCard";
import Skills from "./components/Skills";
import ProjectCarousel from "./components/ProjectCarousel";
import LearningLogEntry from "./components/LearningLogEntry";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";

export default function Home() {
  const projects = useQuery(api.queries.getProjects) || [];
  const learningLogs = useQuery(api.queries.getLearningLogs) || [];

  return (
    <>
      <div className="card">
        <ProfileCard />
        <Skills />

        <div className="section">
          <h2>Projects</h2>
          <div className="project-section">
            <ProjectCarousel projects={projects} />
          </div>
          <div className="view-more-container">
            <Link href="/projects" className="view-more-button">View All Projects</Link>
          </div>
        </div>

        <div className="section">
          <h2>GitHub Activity</h2>
          <div className="github-heatmap">
            <img src="https://ghchart.rshah.org/26a641/Kaushikmak" alt="GitHub Contributions" />
          </div>
        </div>

        <div className="section">
          <h2>Life Log</h2>
          <div id="latest-learning-log" className="learning-log">
            {learningLogs.length > 0 && (
              <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/learning#${learningLogs[0].logId}`}>
                <LearningLogEntry entry={learningLogs[0]} isFullView={false} />
              </div>
            )}
          </div>
          <div className="view-more-container">
            <Link href="/learning" className="view-more-button">View All Entries</Link>
          </div>
        </div>

        <div className="section">
          <h2>Hobbies</h2>
          <p style={{ color: "var(--subtle-text-color)", marginBottom: "1.5rem" }}>
            What I do when I'm not staring at a terminal. Games, movies, and other distractions.
          </p>
          <div className="view-more-container">
            {/* The hobbies index is now migrated to a Next.js page */}
            <Link href="/hobbies" className="view-more-button">Visit Offline Mode</Link>
          </div>
        </div>
      </div>

      <footer className="get-in-touch">
        <h2>Get in Touch</h2>
        <p>
          Want to chat? Just drop your message on{" "}
          <a href="https://x.com/tasytaco" target="_blank" rel="noopener noreferrer">twitter</a>
        </p>
      </footer>

      <ThemeToggle />
    </>
  );
}
