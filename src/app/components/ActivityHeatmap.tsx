"use client";

import "./heatmap.css";

interface ActivityHeatmapProps {
  data: { date: string; count: number }[];
  theme: "gym" | "cooking";
}


export default function ActivityHeatmap({ data, theme }: ActivityHeatmapProps) {
  // Generate a full year of empty data for 2026
  const startDate = new Date(2026, 0, 1);
  const totalDays = 365;
  const days = [];
  
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateString = d.toISOString().split("T")[0];
    
    const dataPoint = data.find(x => x.date === dateString);
    let level = 0;
    if (dataPoint) {
      if (dataPoint.count === 1) level = 1;
      else if (dataPoint.count === 2) level = 2;
      else if (dataPoint.count === 3) level = 3;
      else if (dataPoint.count >= 4) level = 4;
    }

    days.push({
      date: dateString,
      count: dataPoint ? dataPoint.count : 0,
      level,
      shortDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    });
  }

  // Calculate some stats
  const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);
  const activeDays = data.length;

  return (
    <div className={`heatmap-wrapper theme-${theme}`}>
      <div className="heatmap-grid">
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`heatmap-cell level-${day.level}`}
            style={{ animationDelay: `${(idx % 30) * 15}ms` }}
          >
            <div className="tooltip">
              {day.count} {theme === "gym" ? "workouts" : "meals"} on {day.shortDate}
            </div>
          </div>
        ))}
      </div>
      <div className="heatmap-stats">
        <div className="stat-item">
          <span className="stat-value">{totalCount}</span>
          <span className="stat-label">Total in 2026</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{activeDays}</span>
          <span className="stat-label">Active Days</span>
        </div>
      </div>
    </div>
  );
}
