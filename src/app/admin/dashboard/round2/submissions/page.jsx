"use client";

import { useQuery, useMutation } from "convex/react";

import { CheckCircle, XCircle } from "lucide-react";
import { api } from "../../../../../../convex/_generated/api";

export default function Round2SubmissionsPage() {
  const submissions = useQuery(api.round2.getRound2Projects);
  const updateStatus = useMutation(api.round2.updateProjectStatus);

  if (!submissions) return <p className="text-gray-300">Loading...</p>;

  const handleStatus = async (assessmentId, status) => {
    await updateStatus({ assessmentId, status });
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Round 2 – Project Submissions</h1>

      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">

          {/* HEADER */}
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">GitHub</th>
              <th className="px-6 py-3">Demo Link</th>
              <th className="px-6 py-3">Submitted At</th>
              <th className="px-6 py-3">Round 2 Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {submissions.map((item) => (
              <tr
                key={item.assessmentId}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                {/* TEAM NAME */}
                <td className="px-6 py-4">{item.teamName}</td>

                {/* GITHUB */}
                <td className="px-6 py-4">
                  {item.githubLink ? (
                    <a
                      href={item.githubLink}
                      target="_blank"
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* DEMO LINK */}
                <td className="px-6 py-4">
                  {item.demoLink ? (
                    <a
                      href={item.demoLink}
                      target="_blank"
                      className="text-green-400 underline hover:text-green-300"
                    >
                      Demo
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* SUBMITTED AT */}
                <td className="px-6 py-4 text-gray-300">
                  {item.submittedAt
                    ? new Date(item.submittedAt).toLocaleString()
                    : "—"}
                </td>

                {/* ROUND 2 STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold
                      ${
                        item.round2Cleared
                          ? "bg-green-600/20 text-green-400"
                          : item.round2Cleared === false
                          ? "bg-red-600/20 text-red-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }
                    `}
                  >
                    {item.round2Cleared === true
                      ? "Approved"
                      : item.round2Cleared === false
                      ? "Rejected"
                      : "Pending"}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleStatus(item.assessmentId, "approved")}
                    className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-600/30 text-green-300 hover:bg-green-600/40 transition"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatus(item.assessmentId, "rejected")}
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
