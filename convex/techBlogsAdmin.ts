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
    token: v.string(),
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
    if (args.token !== process.env.ADMIN_SESSION_SECRET) {
      throw new Error("Unauthorized");
    }
    const { existingId, token, ...data } = args;
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
    token: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.token !== process.env.ADMIN_SESSION_SECRET) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (args.token !== process.env.ADMIN_SESSION_SECRET) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
