import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // =======================
  // TEAM REGISTRATION TABLE
  // =======================
  teamRegistrations: defineTable({
    leaderId: v.string(),

    teamName: v.string(),
    institution: v.string(),

    leaderName: v.string(),
    leaderEmail: v.string(),

    member1Name: v.string(),
    member1Email: v.string(),
    member2Name: v.string(),
    member2Email: v.string(),

    transactionId: v.string(),
    createdAt: v.number(),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    )
  })
    .index("by_leaderId", ["leaderId"])
    .index("by_email", ["leaderEmail"])
    .index("by_member1Email", ["member1Email"])
    .index("by_member2Email", ["member2Email"])
    .index("by_teamName", ["teamName"]),

  // =======================
  // ASSESSMENT TABLE (UPDATED)
  // =======================
  teamAssessments: defineTable({
    teamId: v.id("teamRegistrations"),

    score: v.number(),

    startedAt: v.number(),
    completedAt: v.optional(v.number()),
    status: v.string(), // "not_started" | "in_progress" | "completed"

    // Fixed question order
    questionOrder: v.optional(v.array(v.id("questions"))),

    // =======================
    // ROUND SYSTEM FIELDS
    // =======================
    round1Attempted: v.optional(v.boolean()),
    round1Score: v.optional(v.number()),
    round1Cleared: v.optional(v.boolean()),

    round2Cleared: v.optional(v.boolean()),
    round2ProjectSubmitted: v.optional(v.boolean()),
  })
    .index("by_teamId", ["teamId"]),

  // =======================
  // IDEA SUBMISSION TABLE
  // =======================
  teamIdeaSubmissions: defineTable({
    teamId: v.id("teamRegistrations"),

    title: v.string(),
    description: v.string(),
    problemStatement: v.string(),

    githubLink: v.optional(v.string()),
    demoLink: v.optional(v.string()),

    submittedAt: v.number(),
    status: v.string(),
  })
    .index("by_teamId", ["teamId"])
    .index("by_status", ["status"]),

  // =======================
  // QUESTIONS TABLE
  // =======================
  questions: defineTable({
    text: v.string(),
    options: v.array(v.string()),
    answer: v.string(),
    qid: v.number(),
    createdAt: v.number(),
  })
    .index("by_qid", ["qid"]),
});
