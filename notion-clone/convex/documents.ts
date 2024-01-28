import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    // load all documents
    const documents = await ctx.db.query("documents").collect();

    return documents;
  },
});

export const create = mutation({
  //   when we create a new document, the args we need to pass
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  // context, args
  handler: async (ctx, args) => {
    // fetch the currently logged in user
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
