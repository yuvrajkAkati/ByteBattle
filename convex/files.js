import { mutation } from "./_generated/server";
import { v } from "convex/values";



export const uploadReceipt = mutation({
  args: { file: v.bytes() }, // you send bytes, we convert to Blob
  handler: async (ctx, args) => {
    const { file } = args;

    // Convert Uint8Array → Blob
    const blob = new Blob([file]);

    // Correct API in your version
    const storageId = await ctx.storage.store(blob);

    return storageId;
  }
});



export const getReceipt = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.storage.get(args.storageId);
    return file; // Returns Uint8Array (buffer)
  },
});
