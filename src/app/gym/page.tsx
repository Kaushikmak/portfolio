"use client";

import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import ActivityHeatmap from "../components/ActivityHeatmap";
import "./gym.css";
import { useState, useEffect } from "react";

type HeatmapPoint = {
  date: string;
  count: number;
};

export default function GymPage() {
  const [gymData, setGymData] = useState<HeatmapPoint[]>([]);

  useEffect(() => {
    // client‑side mock data generation to avoid hydration mismatch
    const data: HeatmapPoint[] = [];
    const start = new Date(2026, 0, 1);
    for (let i = 0; i < 150; i++) {
      if (Math.random() < 0.6) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        data.push({
          date: d.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 3) + 1,
        });
      }
    }
    setGymData(data);
  }, []);

  return (
    <>
      <div className="card gym-page">
        <header className="page-header">
          <Link href="/hobbies" className="back-link">&larr; Back to Offline Mode</Link>
          <h1>Gym Logs</h1>
          <p className="subtitle">Pushing for a 50kg Bench Press.</p>
        </header>

        <div className="section">
          <h2>2026 Activity</h2>
          <ActivityHeatmap data={gymData} theme="gym" />
        </div>

        <div className="section">
          <h2>Current Routine</h2>
          <div className="routine-cards">
            <div className="routine-card">
              <h3>Push</h3>
              <ul>
                <li>Bench Press: 3x8</li>
                <li>Overhead Press: 3x10</li>
                <li>Tricep Extensions: 3x12</li>
              </ul>
            </div>
            <div className="routine-card">
              <h3>Pull</h3>
              <ul>
                <li>Lat Pulldowns: 3x10</li>
                <li>Barbell Rows: 3x8</li>
                <li>Bicep Curls: 3x12</li>
              </ul>
            </div>
            <div className="routine-card">
              <h3>Legs</h3>
              <ul>
                <li>Squats: 3x8</li>
                <li>Leg Press: 3x10</li>
                <li>Calf Raises: 4x15</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
