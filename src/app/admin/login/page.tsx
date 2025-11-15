// src/app/admin/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ByteBattleLogo from "@/app/components/ui/ByteBattleLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      setError("Server returned invalid JSON");
      return;
    }

    if (!res.ok) {
      setError(data?.error || "Login failed");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#120000] to-black px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gradient-to-br from-red-900/30 via-black/50 to-red-950/20 backdrop-blur-xl border border-red-600/20 rounded-3xl p-10 shadow-[0_0_35px_rgba(255,0,0,0.25)]"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl shadow-[0_0_25px_rgba(255,0,0,0.5)] flex items-center justify-center">
            <ByteBattleLogo />
          </div>

          <h1 className="text-2xl font-extrabold text-red-400 drop-shadow-[0_0_12px_rgba(255,0,0,0.4)]">
            Admin Login
          </h1>
          <p className="text-white/50 mt-1 text-sm">Access the dashboard</p>
        </div>

        {/* INPUT FIELDS */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs text-white/50 mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-red-500/20 text-white placeholder:text-red-300/40 focus:border-red-500 focus:ring-2 focus:ring-red-600/40 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1">Password</label>
            <input
              type="password"
              placeholder="Password (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-red-500/20 text-white placeholder:text-red-300/40 focus:border-red-500 focus:ring-2 focus:ring-red-600/40 outline-none transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 mt-1">{error}</p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full mt-7 bg-gradient-to-r from-red-700 to-red-500 text-white py-3 rounded-xl font-semibold 
          shadow-[0_0_15px_rgba(255,0,0,0.3)] border border-red-600/30 
          hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-300"
        >
          Login
        </button>

        {/* FOOTER TEXT */}
        <div className="mt-6 text-center text-xs text-white/40">
          Only authorized admins can log in.
        </div>
      </form>
    </div>
  );
}
