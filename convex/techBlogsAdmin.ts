import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listAllTechBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("techBlogs").order("desc").collect();
  },
});

export const upsertTechBlog = mutation({
  args: {
    existingId: v.optional(v.id("techBlogs")),
    title: v.string(),
    summary: v.optional(v.string()),
    content: v.string(),
    date: v.string(),
    slug: v.string(),
    tags: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { existingId, ...data } = args;
    if (existingId) {
      await ctx.db.patch(existingId, data);
      return existingId;
    } else {
      return await ctx.db.insert("techBlogs", data);
    }
  },
});

export const deleteTechBlog = mutation({
  args: {
    id: v.id("techBlogs"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
