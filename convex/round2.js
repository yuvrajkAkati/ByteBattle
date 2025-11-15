import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/* -------------------------------------------------------
   GET ALL ROUND 2 PROJECTS WITH TEAM INFO
-------------------------------------------------------- */
export const getRound2Projects = query({
  handler: async (ctx) => {
    // 1. Get all idea submissions (Round 2)
    const submissions = await ctx.db
      .query("teamIdeaSubmissions")
      .order("desc")
      .collect();

    let results = [];

    for (const sub of submissions) {
      // 2. Fetch team info
      const team = await ctx.db.get(sub.teamId);
      if (!team) continue;

      // 3. Fetch assessment
      const assess = await ctx.db
        .query("teamAssessments")
        .withIndex("by_teamId", (q) => q.eq("teamId", sub.teamId))
        .first();

      results.push({
        teamId: sub.teamId,
        teamName: team.teamName,
        institution: team.institution,
        round2Cleared: assess?.round2Cleared ?? null,
        // ----- ROUND 2 Submission -----
        projectSubmitted: assess?.round2ProjectSubmitted ?? false,
        githubLink: sub.githubLink ?? null,
        demoLink: sub.demoLink ?? null,
        submittedAt: sub.submittedAt,
        status: sub.status,   // 🔥 ADDED: Needed because schema contains status
          assessmentId: assess?._id ?? null,  
        // Optional extra info
        title: sub.title,
        description: sub.description,
      });
    }

    return results;
  },
});


/* -------------------------------------------------------
   UPDATE PROJECT STATUS (approve/reject Round 2)
-------------------------------------------------------- */
export const updateProjectStatus = mutation({
  args: {
    assessmentId: v.id("teamAssessments"),
    status: v.string(), // "approved" | "rejected"
  },
  handler: async (ctx, { assessmentId, status }) => {
    await ctx.db.patch(assessmentId, {
      round2Cleared: status === "approved",
    });
  },
});



/* -------------------------------------------------------
   GET ALL TEAMS WHO SUBMITTED A ROUND 2 PROJECT
-------------------------------------------------------- */
export const getSubmittedProjects = query({
  handler: async (ctx) => {
    const submissions = await ctx.db
      .query("teamIdeaSubmissions")
      .filter((q) => q.eq(q.field("status"), "submitted"))
      .collect();

    const result = [];

    for (const s of submissions) {
      const team = await ctx.db.get(s.teamId);
      if (team) result.push({ team, submission: s });
    }

    return result;
  },
});


/* -------------------------------------------------------
   FINALISTS (round2Cleared = true)
-------------------------------------------------------- */
export const getFinalists = query({
  handler: async (ctx) => {
    const assessments = await ctx.db
      .query("teamAssessments")
      .filter((q) => q.eq(q.field("round2Cleared"), true))
      .collect();

    const result = [];

    for (const a of assessments) {
      const team = await ctx.db.get(a.teamId);
      if (team) result.push({ team, assessment: a });
    }

    return result;
  },
});


/* -------------------------------------------------------
   ROUND 2 STATUS FOR A TEAM
-------------------------------------------------------- */
export const getRound2Status = query({
  args: {
    teamId: v.id("teamRegistrations"),
  },

  handler: async (ctx, { teamId }) => {
    const assessment = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .first();

    if (!assessment) {
      return {
        submitted: false,
        cleared: false,
      };
    }

    return {
      submitted: assessment.round2ProjectSubmitted ?? false,
      cleared: assessment.round2Cleared ?? false,
    };
  },
});


/**
 * Submit Round 2 Project
 */
export const submitProject = mutation({
  args: {
    teamId: v.id("teamRegistrations"),
    title: v.string(),
    description: v.string(),
    problemStatement: v.string(),
    githubLink: v.string(),
    demoLink: v.string(),
  },

  handler: async (ctx, data) => {
    const { teamId, title, description, problemStatement, githubLink, demoLink } = data;

    const team = await ctx.db.get(teamId);
    if (!team) throw new Error("Team not found");

    const assessment = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", q => q.eq("teamId", teamId))
      .first();

    if (!assessment) throw new Error("Assessment not found");
    if (!assessment.round1Cleared)
      throw new Error("You are not eligible for Round 2");

    const existing = await ctx.db
      .query("teamIdeaSubmissions")
      .withIndex("by_teamId", q => q.eq("teamId", teamId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title,
        description,
        problemStatement,
        githubLink,
        demoLink,
        submittedAt: Date.now(),
        status: "submitted",
      });
    } else {
      await ctx.db.insert("teamIdeaSubmissions", {
        teamId,
        title,
        description,
        problemStatement,
        githubLink,
        demoLink,
        submittedAt: Date.now(),
        status: "submitted",
      });
    }

    await ctx.db.patch(assessment._id, {
      round2ProjectSubmitted: true,
    });

    return { success: true };
  },
});


/**
 * Check existing submission
 */
export const getMySubmission = query({
  args: { teamId: v.id("teamRegistrations") },

  handler: async (ctx, { teamId }) => {
    return await ctx.db
      .query("teamIdeaSubmissions")
      .withIndex("by_teamId", q => q.eq("teamId", teamId))
      .first();
  },
});
