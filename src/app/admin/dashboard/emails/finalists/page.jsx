"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function FinalistsEmailPage() {
  const finalists = useQuery(api.round2.getFinalists);

  const [subject, setSubject] = useState("Congratulations — You Are a Finalist!");
  const [message, setMessage] = useState(
    `<p>Hello Team,</p>
     <p>Congratulations! You have been selected as a <strong>finalist</strong> for Hackathon 2026.</p>
     <p>We will send schedule & venue details shortly.</p>
     <p>Regards,<br/>Hackathon Team</p>`
  );

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!finalists) return <p className="text-gray-400">Loading...</p>;

  const emails = finalists.map((f) => f.team.leaderEmail);

  const sendEmails = async () => {
    setLoading(true);

    const res = await fetch("/api/admin/emails/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails, subject, message }),
    });

    setLoading(false);

    const data = await res.json();
    setStatus(data.success ? "Emails sent!" : "Error sending emails");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finalists — Bulk Email</h1>

      {/* TABLE */}
      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3">Leader</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {finalists.map((f) => (
              <tr key={f.team._id} className="border-b border-white/5">
                <td className="px-6 py-4">{f.team.teamName}</td>
                <td className="px-6 py-4">{f.team.leaderName}</td>
                <td className="px-6 py-4">{f.team.leaderEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
