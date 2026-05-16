"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import WeeklyLogPreview from "../components/WeeklyLogPreview";

export default function Learning() {
  const yearsQuery = useQuery(api.queries.listLearningYears);
  const years = yearsQuery ?? [];
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const sidebarYear = selectedYear ?? years[0] ?? new Date().getFullYear();
  const sidebarLogs = useQuery(api.queries.listRecentLearningLogsByYear, { year: sidebarYear, limit: 10 }) || [];
  const mainLogs = useQuery(api.queries.listRecentLearningLogsByYear, {
    year: sidebarYear,
    limit: 24,
  }) || [];

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        <div className="section journal-header">
          <div className="log-header">
            <h2>Life Log</h2>
            <p className="subtitle" style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }}>
              Weekly journal of what I learned, built, and lived through.
            </p>
          </div>
          <div className="year-tabs">
            {years.map((year: number) => (
              <button
                key={year}
                className={`year-tab ${year === sidebarYear ? "active" : ""}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="journal-layout">
          <aside className="journal-sidebar">
            <h3>Previous Weeks</h3>
            <div className="journal-sidebar-list">
              {sidebarLogs.map((log) => (
                <Link key={log._id} href={`/learning/${log.year}/${log.weekSlug}`} className="week-chip">
                  <span>W{log.weekNumber}</span>
                  <strong>{log.title}</strong>
                </Link>
              ))}
            </div>
          </aside>

          <main className="journal-main">
            {mainLogs.map((log) => (
              <WeeklyLogPreview key={log._id} entry={log} compact />
            ))}
          </main>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
