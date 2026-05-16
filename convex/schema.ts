import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    projectId: v.string(), // e.g., 'task-tracker'
    title: v.string(),
    description: v.string(),
    customIcon: v.optional(v.string()), // SVG string
    image: v.optional(v.string()), // URL if using image
    github: v.string(),
    live: v.string(),
    docs: v.optional(v.string()),
    tags: v.array(v.string()),
    order: v.number(), // to preserve display order
  }).index("by_order", ["order"]),

  learningLogs: defineTable({
    logId: v.optional(v.string()), // legacy id
    date: v.optional(v.string()), // legacy display date
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(),
    order: v.optional(v.number()), // legacy sort order
    year: v.optional(v.number()),
    weekNumber: v.optional(v.number()),
    weekSlug: v.optional(v.string()),
    weekStartDate: v.optional(v.string()),
    weekEndDate: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    galleryImages: v.optional(
      v.array(
        v.object({
          src: v.string(),
          alt: v.string(),
          caption: v.optional(v.string()),
        }),
      ),
    ),
    tags: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
  })
    .index("by_year_and_weekNumber", ["year", "weekNumber"])
    .index("by_year_and_weekSlug", ["year", "weekSlug"]),

  blogs: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    link: v.string(),
    tags: v.array(v.string()),
    order: v.number(),
  }).index("by_order", ["order"]),
});
