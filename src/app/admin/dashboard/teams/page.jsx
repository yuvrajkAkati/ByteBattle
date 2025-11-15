"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export default function TeamsPage() {
  // ⭐ Fetch all teams
  const teams = useQuery(api.teamRegistrations.getAllTeams);

  if (teams === undefined) {
    return <p className="text-gray-300">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Teams</h1>

      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">

          {/* HEADERS */}
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Institution</th>
              <th className="px-6 py-3">Leader</th>
              <th className="px-6 py-3">Members</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {teams.map((team) => (
              <tr
                key={team._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{team.teamName}</td>
                <td className="px-6 py-4">{team.institution}</td>

                <td className="px-6 py-4">
                  {team.leaderName}
                  <br />
                  <span className="text-xs text-gray-400">{team.leaderEmail}</span>
                </td>

                <td className="px-6 py-4">
                  {team.member1Name}{" "}
                  <span className="text-xs text-gray-400">
                    ({team.member1Email})
                  </span>
                  <br />
                  {team.member2Name}{" "}
                  <span className="text-xs text-gray-400">
                    ({team.member2Email})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
