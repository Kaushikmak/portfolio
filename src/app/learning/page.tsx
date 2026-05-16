"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import LearningLogList from "../components/LearningLogList";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export default function Learning() {
  const learningLogs = useQuery(api.queries.getLearningLogs) || [];

  return (
    <>
      <div className="card">
        <Link href="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        <div className="section">
          <div className="log-header">
            <h2>Life Log</h2>
            <p className="subtitle" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
              Tracking what I learn, build, and sometimes break.
            </p>
          </div>
          <LearningLogList logs={learningLogs} />
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
