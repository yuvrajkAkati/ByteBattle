"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const { GridBackground } = require("@/app/components/ui/grid-background");

export default function AdminDashboard() {
  const count = useQuery(api.countTeam.countRegisteredTeams);
  const count1 = useQuery(api.countTeam.countRound1Cleared);
  const count2 = useQuery(api.countTeam.countRound2Cleared);
  return (
    <div className="space-y-6 text-white">
      <GridBackground />

      {/* Title */}
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Teams */}
        <div className="bg-black/40 p-6 rounded-xl border border-black/50">
          <h2 className="text-xl font-semibold">Total Teams</h2>
          <p className="text-4xl font-bold mt-3">{count ?? 0}</p>
        </div>

        {/* Round 1 Cleared */}
        <div className="bg-black/40 p-6 rounded-xl border border-black/50">
          <h2 className="text-xl font-semibold">Round 1 Cleared</h2>
          <p className="text-4xl font-bold mt-3">{count1 ?? 0}</p>
        </div>

        {/* Round 2 Cleared */}
        <div className="bg-black/40 p-6 rounded-xl border border-black/50">
          <h2 className="text-xl font-semibold">Round 2 Cleared</h2>
          <p className="text-4xl font-bold mt-3">{count2 ?? 0}</p>
        </div>
      </div>

      {/* Finalists */}
      <div className="bg-black/40 p-6 rounded-xl border border-black/50">
        <h2 className="text-xl font-semibold">Finalists</h2>
        <p className="text-4xl font-bold mt-3">10</p>
      </div>

      {/* Recent Registrations */}
      <div className="bg-black/40 p-6 rounded-xl border border-black/50">
        <h2 className="text-xl font-semibold mb-3">Recent Registrations</h2>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}
