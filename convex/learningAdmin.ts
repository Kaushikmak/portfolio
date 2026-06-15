import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const galleryImageValidator = v.object({
  src: v.string(),
  alt: v.string(),
  caption: v.optional(v.string()),
});

export const listAllWeeklyLogs = query({
  args: {},
  handler: async (ctx) => {
    const logs = await ctx.db
      .query("learningLogs")
      .withIndex("by_year_and_weekNumber")
      .order("desc")
      .take(300);

    return logs.filter((log) => typeof log.year === "number" && typeof log.weekNumber === "number" && typeof log.weekSlug === "string");
  },
});

export const deleteWeeklyLog = mutation({
  args: { id: v.id("learningLogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const upsertWeeklyLog = mutation({
  args: {
    existingId: v.optional(v.id("learningLogs")),
    logId: v.optional(v.string()),
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(),
    year: v.number(),
    weekNumber: v.number(),
    weekSlug: v.string(),
    weekStartDate: v.string(),
    weekEndDate: v.string(),
    coverImage: v.optional(v.string()),
    galleryImages: v.optional(v.array(galleryImageValidator)),
    tags: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const normalizedSlug = args.weekSlug.trim().toLowerCase();

    let targetId = args.existingId;
    if (!targetId) {
      const matches = await ctx.db
        .query("learningLogs")
        .withIndex("by_year_and_weekSlug", (q) => q.eq("year", args.year).eq("weekSlug", normalizedSlug))
        .order("desc")
        .take(1);
      targetId = matches[0]?._id;
    }

    const payload = {
      logId: args.logId ?? `week-${args.weekNumber}-${args.year}`,
      title: args.title,
      summary: args.summary,
      content: args.content,
      year: args.year,
      weekNumber: args.weekNumber,
      weekSlug: normalizedSlug,
      weekStartDate: args.weekStartDate,
      weekEndDate: args.weekEndDate,
      coverImage: args.coverImage,
      galleryImages: args.galleryImages,
      tags: args.tags,
      isPublished: args.isPublished ?? true,
      date: new Date(args.weekEndDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    if (targetId) {
      await ctx.db.patch(targetId, payload);
      return targetId;
    }

    return await ctx.db.insert("learningLogs", {
      ...payload,
      order: 0,
    });
  },
});
