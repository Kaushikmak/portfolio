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
    logId: v.string(), // e.g., 'week-2-2026'
    date: v.string(), // Display date
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(), // HTML string
    order: v.number(), // Sort order
  }).index("by_order", ["order"]),

  blogs: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    link: v.string(),
    tags: v.array(v.string()),
    order: v.number(),
  }).index("by_order", ["order"]),
});
