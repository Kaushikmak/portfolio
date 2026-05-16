"use client";

import { useState, useEffect } from "react";

export default function LearningLogEntry({ entry, isFullView = false, startExpanded = false }: { entry: any, isFullView?: boolean, startExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(startExpanded);

  useEffect(() => {
    setIsExpanded(startExpanded);
  }, [startExpanded]);

  const wordLimit = 30;
  
  const truncateText = (text: string, limit: number) => {
    // Basic stripping of HTML tags for summary if needed, but we can also just rely on entry.summary
    const stripped = text.replace(/<[^>]*>?/gm, '');
    const words = stripped.split(' ');
    if (words.length <= limit) return stripped;
    return words.slice(0, limit).join(' ') + '...';
  };

  const shortContent = entry.summary ? entry.summary : truncateText(entry.content, wordLimit);
  const isExpandable = !!entry.summary || entry.content.split(' ').length > wordLimit;

  if (isFullView) {
    return (
      <article className="log-entry" id={entry.logId}>
        <p className="log-date">{entry.date}</p>
        <div className="log-content">
          <h3>{entry.title}</h3>
          <div className="log-text" dangerouslySetInnerHTML={{ __html: entry.content }} />
        </div>
      </article>
    );
  }

  return (
    <article className={`log-entry ${isExpandable ? 'expandable' : ''} ${isExpanded ? 'is-expanded' : ''}`} id={entry.logId}>
      <p className="log-date">{entry.date}</p>
      <div className="log-content">
        <h3>{entry.title}</h3>
        
        <div className="log-short">
          <p>{shortContent}</p>
        </div>
        
        <div className="log-full" dangerouslySetInnerHTML={{ __html: entry.content }} />
        
        {isExpandable && (
          <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </article>
  );
}
