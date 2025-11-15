"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

export default function Round1LeaderboardPage() {
  const leaderboard = useQuery(api.round1.getRound1Leaderboard);

  if (!leaderboard) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Round 1 Scores</h1>

      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">

          {/* TABLE HEADER */}
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Round 1 Score</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {leaderboard.map((team) => {
              const qualified = (team.score ?? 0) > 45;

              return (
                <tr
                  key={team.teamId}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* TEAM NAME */}
                  <td className="px-6 py-4">{team.teamName}</td>

                  {/* SCORE */}
                  <td className="px-6 py-4 font-semibold text-blue-300">
                    {team.score ?? 0}
                  </td>

                  {/* QUALIFIED BADGE */}
                  <td className="px-6 py-4">
                    {qualified ? (
                      <span className="px-3 py-1 text-xs rounded-lg bg-green-600/20 text-green-300 font-semibold">
                        Qualified
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-lg bg-red-600/20 text-red-300 font-semibold">
                        Not Qualified
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
