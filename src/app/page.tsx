"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProfileCard from "./components/ProfileCard";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import ProjectCarousel from "./components/ProjectCarousel";
import WeeklyLogPreview from "./components/WeeklyLogPreview";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";

export default function Home() {
  const projects = useQuery(api.queries.getProjects) || [];
  const latestLearningLog = useQuery(api.queries.getLatestLearningLog);
  const latestTechBlog = useQuery(api.queries.getTechBlogs)?.[0];

  return (
    <>
      <div className="card">
        <ProfileCard />
        <Skills />
        <Experience />

        <div className="section">
          <h2>Projects</h2>
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

            <div style={{ pointerEvents: "none", userSelect: "none" }}>
              <div className="project-section">
                <ProjectCarousel projects={projects} />
              </div>
              <div className="view-more-container">
                <Link href="/projects" className="view-more-button" tabIndex={-1} aria-hidden="true">View All Projects</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>GitHub Activity</h2>
          <div className="github-heatmap">
            <img src="https://ghchart.rshah.org/26a641/Kaushikmak" alt="GitHub Contributions" />
          </div>
        </div>

        <div className="section">
          <h2>Quick Tech Bytes</h2>
          <div className="tech-blogs-grid" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {latestTechBlog ? (
              <article className="journal-card compact">
                <div className="journal-content" style={{ padding: "1.2rem" }}>
                  <p className="journal-meta">{latestTechBlog.date}</p>
                  <h3 style={{ margin: "0.4rem 0", color: "var(--text)" }}>{latestTechBlog.title}</h3>
                  {latestTechBlog.summary && <p style={{ color: "var(--text-muted)", margin: "0.4rem 0 0.8rem 0", fontSize: "0.9rem" }}>{latestTechBlog.summary}</p>}
                  <Link href={`/tech-blogs/${latestTechBlog.slug}`} style={{ textDecoration: "none" }}>
                    <span className="journal-link" style={{ marginTop: 0 }}>Read Blog</span>
                  </Link>
                </div>
              </article>
            ) : (
              <p>No tech bytes yet.</p>
            )}
          </div>
          <div className="view-more-container">
            <Link href="/tech-blogs" className="view-more-button">View All Tech Bytes</Link>
          </div>
        </div>

        <div className="section">
          <h2>Life Log</h2>
          <div id="latest-learning-log" className="learning-log">
            {latestLearningLog && <WeeklyLogPreview entry={latestLearningLog} />}
          </div>
          <div className="view-more-container">
            <Link href="/learning" className="view-more-button">View Weekly Logs</Link>
          </div>
        </div>

        <div className="section">
          <h2>Hobbies</h2>
          <p className="subtitle" suppressHydrationWarning>
            What I do when I am not staring at a terminal. Games, movies, and other distractions.
          </p>
          <div className="view-more-container">
            {/* The hobbies index is now migrated to a Next.js page */}
            <Link href="/hobbies" className="view-more-button">Visit Offline Mode</Link>
          </div>
        </div>
      </div>

      <footer className="get-in-touch">
        <div className="footer-bg-container">
          <img src="/footer_transparent.png" alt="Footer decoration" className="footer-tree-img" />
        </div>
        <div className="get-in-touch-content">
          <h2>Get in Touch</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Want to chat? Just drop your message on twitter.
          </p>
          <a href="https://x.com/tstytaco" target="_blank" rel="noopener noreferrer" className="view-more-button" style={{ display: "inline-block" }}>
            Message on Twitter
          </a>
        </div>
      </footer>

      <ThemeToggle />
    </>
  );
}
