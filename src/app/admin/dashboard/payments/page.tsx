"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { CheckCircle, XCircle, Search } from "lucide-react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

// Proper Team Type
type Team = {
  _id: Id<"teamRegistrations">;
  teamName: string;
  institution: string;
  leaderName: string;
  paymentStatus: string;
  member1Name: string;
  member2Name: string;
};

export default function AdminPaymentsPage() {
  const teams = useQuery(api.teamRegistrations.getAllTeams) as Team[] | undefined;

  const updateStatus = useMutation(api.teamRegistrations.updatePaymentStatus);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (!teams) return <p className="text-gray-400">Loading...</p>;

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.teamName.toLowerCase().includes(search.toLowerCase()) ||
      team.institution.toLowerCase().includes(search.toLowerCase()) ||
      team.leaderName.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : team.paymentStatus === filter;

    return matchesSearch && matchesFilter;
  });

  // FIXED — teamId now has correct Convex type
  const updatePayment = async (teamId: Id<"teamRegistrations">, status: string) => {
    await updateStatus({ teamId, status });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment Verification</h1>

      {/* -------------------------
          SEARCH + FILTER BAR
      --------------------------- */}
      <div className="flex gap-4 items-center">

        {/* SEARCH BAR */}
        <div className="relative w-72">
          <Search className="absolute top-3 left-3 text-gray-400" size={18} />
          <input
            placeholder="Search teams..."
            className="w-full bg-white/10 border border-white/10 pl-10 pr-4 py-2 rounded-lg text-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <select
          className="bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-white outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* -------------------------
          TEAMS TABLE
      --------------------------- */}
      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">

          {/* HEADERS */}
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Institution</th>
              <th className="px-6 py-3">Leader</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredTeams.map((team: any) => (
              <tr
                key={team._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{team.teamName}</td>
                <td className="px-6 py-4">{team.institution}</td>
                <td className="px-6 py-4">{team.leaderName}</td>
                <td className="px-6 py-4">{team.transactionId}</td>
                {/* STATUS BADGE */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      team.paymentStatus === "approved"
                        ? "bg-green-600/20 text-green-400"
                        : team.paymentStatus === "rejected"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-yellow-600/20 text-yellow-400"
                    }`}
                  >
                    {team.paymentStatus}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => updatePayment(team._id, "approved")}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-600/30 text-green-300 hover:bg-green-600/40 transition"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => updatePayment(team._id, "rejected")}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600/30 text-red-300 hover:bg-red-600/40 transition"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
