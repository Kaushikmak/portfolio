import { mutation } from "./_generated/server";
import { v } from "convex/values";

// ----- Projects -----
export const upsertProject = mutation({
  args: {
    id: v.optional(v.id("projects")),
    projectId: v.string(),
    title: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    customIcon: v.optional(v.string()),
    github: v.string(),
    live: v.string(),
    docs: v.optional(v.string()),
    tags: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const payload = {
      projectId: args.projectId,
      title: args.title,
      description: args.description,
      image: args.image,
      customIcon: args.customIcon,
      github: args.github,
      live: args.live,
      docs: args.docs,
      tags: args.tags,
      order: args.order,
    };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
    } else {
      await ctx.db.insert("projects", payload);
    }
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ----- Cooking Logs -----
export const upsertCookingLog = mutation({
  args: {
    id: v.optional(v.id("cookingLogs")),
    title: v.string(),
    description: v.string(),
    image: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const payload = {
      title: args.title,
      description: args.description,
      image: args.image,
      order: args.order,
    };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
    } else {
      await ctx.db.insert("cookingLogs", payload);
    }
  },
});

export const deleteCookingLog = mutation({
  args: { id: v.id("cookingLogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ----- Gym Activity -----
export const upsertGymActivity = mutation({
  args: {
    id: v.optional(v.id("gymActivity")),
    date: v.string(),
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const payload = {
      date: args.date,
      count: args.count,
    };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
    } else {
      await ctx.db.insert("gymActivity", payload);
    }
  },
});

export const deleteGymActivity = mutation({
  args: { id: v.id("gymActivity") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ----- Gym Routines -----
export const upsertGymRoutine = mutation({
  args: {
    id: v.optional(v.id("gymRoutines")),
    day: v.string(),
    exercises: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const payload = {
      day: args.day,
      exercises: args.exercises,
      order: args.order,
    };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
    } else {
      await ctx.db.insert("gymRoutines", payload);
    }
  },
});

export const deleteGymRoutine = mutation({
  args: { id: v.id("gymRoutines") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
