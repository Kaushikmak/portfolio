"use client";

import { useEffect, useState } from "react";
import LearningLogEntry from "./LearningLogEntry";

export default function LearningLogList({ logs }: { logs: any[] }) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (window.location.hash) {
      setHash(window.location.hash.substring(1));
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const entryToExpand = document.getElementById(hash);
      if (entryToExpand) {
        entryToExpand.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash, logs]);

  return (
    <div id="full-learning-log" className="learning-log">
      {logs.map((log) => (
        <LearningLogEntry 
          key={log.logId} 
          entry={log} 
          startExpanded={hash === log.logId} 
        />
      ))}
    </div>
  );
}
