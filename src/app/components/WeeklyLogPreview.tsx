import Link from "next/link";
import Image from "next/image";

type WeeklyLog = {
  year?: number;
  weekSlug?: string;
  weekNumber?: number;
  title: string;
  summary?: string;
  date?: string;
  weekStartDate?: string;
  weekEndDate?: string;
  coverImage?: string;
};

function formatRange(start?: string, end?: string) {
  if (!start || !end) return "Date not set";
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

export default function WeeklyLogPreview({ entry, compact = false }: { entry: WeeklyLog; compact?: boolean }) {
  const year = entry.year ?? new Date().getFullYear();
  const weekNumber = entry.weekNumber ?? 0;
  const weekSlug = entry.weekSlug ?? "week-0";

  return (
    <article className={`journal-card ${compact ? "compact" : ""}`}>
      {entry.coverImage && (
        <div className="journal-cover-wrap">
          <Image
            src={entry.coverImage}
            alt={entry.title}
            className="journal-cover"
            width={1200}
            height={675}
          />
        </div>
      )}
      <div className="journal-content">
        <p className="journal-meta">Week {weekNumber}, {year} • {formatRange(entry.weekStartDate, entry.weekEndDate)}</p>
        <h3>{entry.title}</h3>
        {entry.summary && <p>{entry.summary}</p>}
        <Link className="journal-link" href={`/learning/${year}/${weekSlug}`}>
          Read Weekly Entry
        </Link>
      </div>
    </article>
  );
}
