"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function Round1EmailPage() {
  const assessments = useQuery(api.round1.getClearedTeams);

  const [subject, setSubject] = useState("Round 1 Results — Congratulations!");
  const [message, setMessage] = useState(
    `<p>Hello Team,</p>
     <p>Congratulations! You have <strong>cleared Round 1</strong> of Hackathon 2026.</p>
     <p>Details about Round 2 will be shared soon.</p>
     <p>Regards,<br/>Hackathon Team</p>`
  );

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!assessments) return <p className="text-gray-400">Loading...</p>;

  const emails = assessments.map((a) => a.team.leaderEmail);

  const sendEmails = async () => {
    setLoading(true);

    const res = await fetch("/api/admin/emails/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails, subject, message }),
    });

    const data = await res.json();
    setLoading(false);
    setStatus(data.success ? "Emails sent!" : "Failed to send emails");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Round 1 — Email Cleared Teams</h1>

      {/* TABLE */}
      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {assessments.map((row) => (
              <tr key={row.team._id} className="border-b border-white/5">
                <td className="px-6 py-4">{row.team.teamName}</td>
                <td className="px-6 py-4">{row.ass.round1Score}</td>
                <td className="px-6 py-4">{row.team.leaderEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMAIL BOX */}
      <EmailBox
        subject={subject}
        setSubject={setSubject}
        message={message}
        setMessage={setMessage}
        loading={loading}
        sendEmails={sendEmails}
        status={status}
      />
    </div>
  );
}

function EmailBox({ subject, setSubject, message, setMessage, loading, sendEmails, status }) {
  return (
    <div className="bg-white/10 border border-white/10 p-6 rounded-xl space-y-4">
      <input
        className="w-full px-4 py-2 rounded bg-white/10 border-white/20"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        className="w-full px-4 py-2 rounded bg-white/10 border-white/20 h-40"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendEmails}
        disabled={loading}
        className="bg-blue-600 px-6 py-3 rounded flex gap-2 items-center"
      >
        <SendHorizontal /> {loading ? "Sending..." : "Send Email"}
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
