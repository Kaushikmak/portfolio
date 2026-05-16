import { query } from "./_generated/server";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_order").collect();
  },
});

export const getLearningLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("learningLogs").withIndex("by_order").collect();
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").withIndex("by_order").collect();
  },
});
