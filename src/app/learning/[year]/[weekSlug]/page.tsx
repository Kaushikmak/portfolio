"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import ThemeToggle from "../../../components/ThemeToggle";

function titleFromWeek(year: number, weekNumber: number) {
  return `Week ${weekNumber}, ${year}`;
}

export default function WeeklyJournalDetailPage() {
  const params = useParams<{ year: string; weekSlug: string }>();
  const year = Number(params.year);
  const weekSlug = params.weekSlug;

  const entry = useQuery(api.queries.getLearningLogByYearAndSlug, Number.isFinite(year) ? { year, weekSlug } : "skip");
  const adjacent = useQuery(
    api.queries.getAdjacentLearningLogs,
    entry ? { currentId: entry._id } : "skip",
  );

  if (entry === undefined) {
    return <div className="card"><p>Loading weekly journal...</p></div>;
  }

  if (!entry) {
    return (
      <div className="card learning-journal-page">
        <Link href="/learning" className="back-link">&larr; Back to Life Log</Link>
        <p>Entry not found.</p>
      </div>
    );
  }

  const entryYear = entry.year ?? year;
  const entryWeekNumber = entry.weekNumber ?? 0;
  const entryWeekStart = entry.weekStartDate ?? "N/A";
  const entryWeekEnd = entry.weekEndDate ?? "N/A";

  return (
    <>
      <div className="card learning-journal-page">
        <Link href="/learning" className="back-link">&larr; Back to Life Log</Link>

        <article className="journal-detail">
          {entry.coverImage && (
            <Image src={entry.coverImage} alt={entry.title} width={1200} height={675} className="journal-detail-cover" />
          )}
          <p className="journal-meta">{titleFromWeek(entryYear, entryWeekNumber)} • {entryWeekStart} to {entryWeekEnd}</p>
          <h1>{entry.title}</h1>
          {entry.summary && <p className="journal-summary">{entry.summary}</p>}

          <section className="journal-body" dangerouslySetInnerHTML={{ __html: entry.content }} />

          {entry.galleryImages && entry.galleryImages.length > 0 && (
            <section className="journal-gallery">
              <h2>Week Gallery</h2>
              <div className="journal-gallery-grid">
                {entry.galleryImages.map((image, idx) => (
                  <figure key={`${image.src}-${idx}`} className="journal-gallery-item">
                    <Image src={image.src} alt={image.alt} width={1200} height={900} />
                    {image.caption && <figcaption>{image.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}
        </article>

        <div className="journal-nav">
          {adjacent?.previousWeek ? (
            <Link href={`/learning/${adjacent.previousWeek.year}/${adjacent.previousWeek.weekSlug}`} className="journal-nav-btn">
              &larr; Previous Week
            </Link>
          ) : <span />}

          {adjacent?.nextWeek ? (
            <Link href={`/learning/${adjacent.nextWeek.year}/${adjacent.nextWeek.weekSlug}`} className="journal-nav-btn">
              Next Week &rarr;
            </Link>
          ) : null}
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}
