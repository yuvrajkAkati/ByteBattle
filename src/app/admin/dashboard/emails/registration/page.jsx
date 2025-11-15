"use client";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function RegistrationEmailPage() {
  const teams = useQuery(api.teamRegistrations.getAllTeams);

  const [subject, setSubject] = useState("Welcome to Hackathon 2026!");
  const [message, setMessage] = useState(
    `<p>Hello Team,</p>
     <p>Thank you for registering for <strong>Hackathon 2026</strong>.</p>
     <p>We are excited to have you on board!</p>
     <p>Stay tuned for more updates.</p>
     <p>Regards,<br/>Hackathon Team</p>`
  );

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!teams) return <p className="text-gray-400">Loading...</p>;

  const emails = teams.map((t) => t.leaderEmail);

  const sendEmails = async () => {
    setLoading(true);

    const res = await fetch("/api/admin/emails/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emails,
        subject,
        message,
      }),
    });

    setLoading(false);

    const data = await res.json();
    setStatus(data.success ? "Emails sent successfully!" : "Error sending emails");
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold">Registration — Bulk Email</h1>

      {/* TABLE OF TEAMS */}
      <div className="bg-white/10 rounded-xl border border-white/10 overflow-hidden">
        <table className="min-w-full text-left">

          {/* HEADER */}
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Institution</th>
              <th className="px-6 py-3">Leader</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {teams.map((t) => (
              <tr key={t._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="px-6 py-4">{t.teamName}</td>
                <td className="px-6 py-4">{t.institution}</td>
                <td className="px-6 py-4">{t.leaderName}</td>
                <td className="px-6 py-4">{t.leaderEmail}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* EMAIL FORM */}
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

/* -----------------------------
   Reusable Email Box Component
------------------------------ */
function EmailBox({
  subject,
  setSubject,
  message,
  setMessage,
  loading,
  sendEmails,
  status,
}) {
  return (
    <div className="bg-white/10 border border-white/10 p-6 rounded-xl space-y-4">

      {/* SUBJECT */}
      <input
        className="w-full px-4 py-2 rounded bg-white/10 border-white/20"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Email Subject"
      />

      {/* MESSAGE */}
      <textarea
        className="w-full px-4 py-2 rounded bg-white/10 border-white/20 h-40"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Email message..."
      />

      {/* SEND BUTTON */}
      <button
        onClick={sendEmails}
        disabled={loading}
        className="bg-blue-600 px-6 py-3 rounded flex gap-2 items-center hover:bg-blue-500 transition"
      >
        <SendHorizontal size={20} />
        {loading ? "Sending..." : "Send Email to All Teams"}
      </button>

      {/* STATUS MESSAGE */}
      {status && <p className="text-sm text-gray-300">{status}</p>}
    </div>
  );
}
