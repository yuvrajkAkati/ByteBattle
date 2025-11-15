import { query } from "./_generated/server";

export const countRegisteredTeams = query(async ({ db }) => {
  const teams = await db.query("teamRegistrations").take(99999);
  return teams.length;
});



export const countRound1Cleared = query(async ({ db }) => {
  const cleared = await db
    .query("teamAssessments")
    .filter(q => q.eq(q.field("round1Cleared"), true))
    .take(99999); // take all

  return cleared.length;
});


export const countRound2Cleared = query(async({db}) => {
    const cleared = await db
      .query("teamAssessments")
      .filter(q => q.eq(q.field("round2Cleared"), true))
      .take(99999); // take all 
      return cleared.length;
})