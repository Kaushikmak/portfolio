"use client";

import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import ActivityHeatmap from "../components/ActivityHeatmap";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import "./gym.css";

export default function GymPage() {
  const gymActivity = useQuery(api.queries.getGymActivity);
  const gymRoutines = useQuery(api.queries.getGymRoutines);
  
  const gymData = gymActivity ?? [];
  const routines = gymRoutines ?? [];

  return (
    <>
      <div className="card gym-page">
        <header className="page-header">
          <Link href="/hobbies" className="back-link">&larr; Back to Offline Mode</Link>
          <h1>Gym Logs</h1>
          <p className="subtitle">Pushing for a 50kg Bench Press.</p>
        </header>

        <div className="section">
          <h2>Activity</h2>
          <ActivityHeatmap data={gymData} theme="gym" />
        </div>

        <div className="section">
          <h2>Current Routine</h2>
          <div className="routine-cards">
            {routines.map((routine, idx) => (
              <div key={routine._id || idx} className="routine-card">
                <h3>{routine.day}</h3>
                <ul>
                  {(routine.exercises || []).map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            ))}
            {routines.length === 0 && <p>No routines defined yet.</p>}
          </div>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
