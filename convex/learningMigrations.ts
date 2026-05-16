import { mutation } from "./_generated/server";

function getIsoWeekNumber(date: Date) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  return Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getWeekRange(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const toIso = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  return { start: toIso(monday), end: toIso(sunday) };
}

export const migrateLearningLogsToWeekly = mutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("learningLogs").take(500);
    let updated = 0;

    for (const doc of docs) {
      if (doc.year && doc.weekNumber && doc.weekSlug && doc.weekStartDate && doc.weekEndDate) {
        continue;
      }

      const parsedDate = doc.date ? new Date(doc.date) : new Date();
      const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
      const year = safeDate.getFullYear();
      const weekNumber = getIsoWeekNumber(safeDate);
      const weekSlug = `week-${weekNumber}`;
      const range = getWeekRange(safeDate);

      await ctx.db.patch(doc._id, {
        year,
        weekNumber,
        weekSlug,
        weekStartDate: range.start,
        weekEndDate: range.end,
        isPublished: true,
      });
      updated += 1;
    }

    return { updated, total: docs.length };
  },
});

export const repairLearningWeekFieldsFromLogId = mutation({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("learningLogs").take(500);
    let updated = 0;

    for (const doc of docs) {
      if (!doc.logId) continue;
      const match = /^week-(\d+)-(\d{4})$/.exec(doc.logId);
      if (!match) continue;

      const weekNumber = Number(match[1]);
      const year = Number(match[2]);
      const weekSlug = `week-${weekNumber}`;

      const needsUpdate =
        doc.year !== year ||
        doc.weekNumber !== weekNumber ||
        doc.weekSlug !== weekSlug;

      if (!needsUpdate) continue;

      const parsedDate = doc.date ? new Date(doc.date) : new Date();
      const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
      const range = getWeekRange(safeDate);

      await ctx.db.patch(doc._id, {
        year,
        weekNumber,
        weekSlug,
        weekStartDate: doc.weekStartDate ?? range.start,
        weekEndDate: doc.weekEndDate ?? range.end,
        isPublished: true,
      });
      updated += 1;
    }

    return { updated, total: docs.length };
  },
});
