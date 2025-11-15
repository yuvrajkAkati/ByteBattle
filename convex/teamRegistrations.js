import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* ------------------------------------------- */
/*  CREATE TEAM REGISTRATION                    */
/* ------------------------------------------- */
export const createRegistration = mutation({
  args: {
    teamName: v.string(),
    institution: v.string(),

    leaderName: v.string(),
    leaderEmail: v.string(),

    member1Name: v.string(),
    member1Email: v.string(),
    member2Name: v.string(),
    member2Email: v.string(),

    transactionId: v.string(), // required by schema
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    return await ctx.db.insert("teamRegistrations", {
      ...args,
      leaderId: user.subject,
      createdAt: Date.now(),
      paymentStatus: "pending"
    });
  },
});

/* ------------------------------------------- */
/*  QUERY: GET LOGGED-IN USER'S REGISTRATION    */
/* ------------------------------------------- */
export const getMyRegistration = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;

    return await ctx.db
      .query("teamRegistrations")
      .withIndex("by_leaderId", (q) => q.eq("leaderId", user.subject))
      .unique();
  },
});

/* ------------------------------------------- */
/*  QUERY: CHECK IF TEAM NAME IS TAKEN          */
/* ------------------------------------------- */
export const isTeamNameTaken = query({
  args: { teamName: v.string() },

  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_teamName", (q) => q.eq("teamName", args.teamName))
      .unique();

    return team !== null;
  },
});

/* ------------------------------------------- */
/*  QUERY: CHECK IF EMAIL USED ANYWHERE         */
/* ------------------------------------------- */
export const isEmailUsed = query({
  args: { email: v.string() },

  handler: async (ctx, args) => {
    const { email } = args;

    // Leader check
    const leader = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_email", (q) => q.eq("leaderEmail", email))
      .unique();
    if (leader) return true;

    // Member1 check
    const m1 = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_member1Email", (q) => q.eq("member1Email", email))
      .unique();
    if (m1) return true;

    // Member2 check
    const m2 = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_member2Email", (q) => q.eq("member2Email", email))
      .unique();
    if (m2) return true;

    return false;
  },
});



export const getAllTeams = query({
  handler: async (ctx) => {
    const teams = await ctx.db.query("teamRegistrations").collect();
    return teams.sort((a, b) => b.createdAt - a.createdAt); // newest first
  },
});



export const updatePaymentStatus = mutation({
  args: {
    teamId: v.id("teamRegistrations"),
    status: v.string(), // "pending" | "approved" | "rejected"
  },

  handler: async (ctx, { teamId, status }) => {
    await ctx.db.patch(teamId, {
      paymentStatus: status,
    });

    return { success: true };
  },
});


export const getPaymentStatus = query({
  args: { teamId: v.id("teamRegistrations") },

  handler: async (ctx, { teamId }) => {
    const team = await ctx.db.get(teamId);
    if (!team) return null;

    return {
      paymentStatus: team.paymentStatus,
    };
  },
});

