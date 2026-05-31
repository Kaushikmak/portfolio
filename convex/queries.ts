import { query } from "./_generated/server";
import { v } from "convex/values";

function dateScore(date?: string, fallback = 0) {
  if (!date) return fallback;
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function dedupeByWeekSlug<T extends { year?: number; weekSlug?: string; date?: string; _creationTime: number }>(logs: T[]) {
  const picked = new Map<string, T>();
  for (const log of logs) {
    if (typeof log.year !== "number" || typeof log.weekSlug !== "string") continue;
    const key = `${log.year}-${log.weekSlug}`;
    const existing = picked.get(key);
    if (!existing) {
      picked.set(key, log);
      continue;
    }
    const existingScore = dateScore(existing.date, existing._creationTime);
    const currentScore = dateScore(log.date, log._creationTime);
    if (currentScore > existingScore) {
      picked.set(key, log);
    }
  }
  return [...picked.values()];
}

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_order").take(50);
  },
});

export const getLearningLogs = query({
  args: {},
  handler: async (ctx) => {
    const logs = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber")
      .order("desc")
      .take(100);
    return dedupeByWeekSlug(logs).sort((a, b) => dateScore(b.date, b._creationTime) - dateScore(a.date, a._creationTime)).slice(0, 52);
  },
});

export const getLatestLearningLog = query({
  args: {},
  handler: async (ctx) => {
    const logs = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber")
      .order("desc")
      .take(100);
    const deduped = dedupeByWeekSlug(logs).sort((a, b) => dateScore(b.date, b._creationTime) - dateScore(a.date, a._creationTime));
    return deduped[0] ?? null;
  },
});

export const listLearningYears = query({
  args: {},
  handler: async (ctx) => {
    const logs = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber")
      .order("desc")
      .take(300);
    return [...new Set(logs.map((log) => log.year).filter((year): year is number => typeof year === "number"))];
  },
});

export const listRecentLearningLogsByYear = query({
  args: {
    year: v.number(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber", (q) => q.eq("year", args.year))
      .order("desc")
      .take(120);
    return dedupeByWeekSlug(logs)
      .filter((log) => typeof log.weekSlug === "string" && typeof log.weekNumber === "number")
      .sort((a, b) => dateScore(b.date, b._creationTime) - dateScore(a.date, a._creationTime))
      .slice(0, args.limit);
  },
});

export const getLearningLogByYearAndSlug = query({
  args: {
    year: v.number(),
    weekSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekSlug", (q) => q.eq("year", args.year).eq("weekSlug", args.weekSlug))
      .order("desc")
      .take(10);
    const ranked = matches.sort((a, b) => dateScore(b.date, b._creationTime) - dateScore(a.date, a._creationTime));
    return ranked[0] ?? null;
  },
});

export const getAdjacentLearningLogs = query({
  args: {
    currentId: v.id("learningLogs"),
  },
  handler: async (ctx, args) => {
    const ordered = (await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber")
      .order("desc")
      .take(300))
      .filter((item) => typeof item.year === "number" && typeof item.weekNumber === "number" && typeof item.weekSlug === "string");

    const currentIndex = ordered.findIndex((item) => item._id === args.currentId);
    const nextWeek = currentIndex > 0 ? ordered[currentIndex - 1] : null;
    const previousWeek = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null;

    return {
      nextWeek,
      previousWeek,
    };
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").withIndex("by_order").take(100);
  },
});

export const getCookingLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cookingLogs").withIndex("by_order").take(100);
  },
});

export const getGymActivity = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gymActivity").withIndex("by_date").order("desc").take(365);
  },
});

export const getGymRoutines = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gymRoutines").withIndex("by_order").take(20);
  },
});

export const getTechBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("techBlogs")
      .withIndex("by_date")
      .order("desc")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .take(100);
  },
});

export const getTechBlogBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("techBlogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
