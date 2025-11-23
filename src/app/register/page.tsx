"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";
import { Spinner } from "components/spinner";
import { api } from "convex/_generated/api";
import { GridBackground } from "../components/ui/grid-background";
import { Grid } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { isAuthenticated, isLoading } = useConvexAuth();
  /* ---------------------------------------
      FORM STATE
  ---------------------------------------- */
  const [form, setForm] = useState({
    teamName: "",
    institution: "",
    leaderName: "",
    leaderEmail: "",
    member1Name: "",
    member1Email: "",
    member2Name: "",
    member2Email: "",
    transactionId: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ---------------------------------------
      AUTH REDIRECT
  ---------------------------------------- */
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openSignIn({ redirectUrl: "/register" });
    }
  }, [isAuthenticated, isLoading]);

  /* ---------------------------------------
      ALL QUERIES + MUTATIONS AT TOP
  ---------------------------------------- */
  const myRegistration = useQuery(api.teamRegistrations.getMyRegistration);

  const teamNameCheck = useQuery(
    api.teamRegistrations.isTeamNameTaken,
    form.teamName ? { teamName: form.teamName } : "skip"
  );

  const leaderEmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.leaderEmail ? { email: form.leaderEmail } : "skip"
  );

  const member1EmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.member1Email ? { email: form.member1Email } : "skip"
  );

  const member2EmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.member2Email ? { email: form.member2Email } : "skip"
  );

  const createRegistration = useMutation(api.teamRegistrations.createRegistration);

  /* ---------------------------------------
      INPUT HANDLER
  ---------------------------------------- */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------
      SUBMIT HANDLER
  ---------------------------------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    const {
      teamName,
      institution,
      leaderName,
      leaderEmail,
      member1Name,
      member1Email,
      member2Name,
      member2Email,
      transactionId,
    } = form;

    if (
      !teamName ||
      !institution ||
      !leaderName ||
      !leaderEmail ||
      !member1Name ||
      !member1Email ||
      !member2Name ||
      !member2Email ||
      !transactionId
    ) {
      setError("⚠️ Please fill all fields.");
      return;
    }

    const emails = [leaderEmail, member1Email, member2Email];
    if (new Set(emails).size !== emails.length) {
      setError("⚠️ Team member emails must be unique.");
      return;
    }

    if (leaderEmailCheck || member1EmailCheck || member2EmailCheck) {
      setError("⚠️ One of the emails is already used.");
      return;
    }

    if (teamNameCheck) {
      setError("⚠️ Team name already taken.");
      return;
    }

    await createRegistration({
      teamName,
      institution,
      leaderName,
      leaderEmail,
      member1Name,
      member1Email,
      member2Name,
      member2Email,
      transactionId,
    });

    setSuccess(true);
  };

  /* ---------------------------------------
      LOADING STATE
  ---------------------------------------- */
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <GridBackground />
        <Spinner size="icon" />
      </div>
    );
  }

  /* ---------------------------------------
      SUCCESS SCREEN (NO HOOKS BELOW THIS)
  ---------------------------------------- */
  if (success) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-white px-6">
        <GridBackground />
        <h1 className="text-5xl font-bold mb-6 text-red-400">
          🎉 Registration Successful!
        </h1>
        <p className="text-gray-300 text-lg mb-10">
          Your team is now registered for{" "}
          <span className="text-red-400 font-semibold">ByteBattle 2025</span>.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-10 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-semibold"
        >
          Go to Home
        </button>
      </div>
    );
  }

  /* ---------------------------------------
      ALREADY REGISTERED SCREEN
  ---------------------------------------- */
  if (myRegistration) {
    return (
      <div className="flex flex-col min-h-screen text-white">
        <GridBackground />
        <Navbar />

        <div className=" h-screen flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">🎉 Already Registered!</h1>

          <p className="text-gray-300 mb-6 text-lg">
            Your team{" "}
            <span className="text-blue-400 font-semibold">
              {myRegistration.teamName}
            </span>{" "}
            is already registered.
          </p>

          <a
            href="/"
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-xl text-white font-semibold"
          >
            Go Back Home
          </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
      REGISTRATION FORM (SAFE — hooks ABOVE)
  ---------------------------------------- */
  return (
    <div className="flex flex-col text-white ">
      <GridBackground />
      <Navbar />

      <div className="min-h-screen px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Register for <span className="text-blue-400">ByteBattle 2025</span>
          </h1>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <div className="backdrop-blur border border-gray-700 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* TEAM INFO */}
              <div>
                <h3 className="text-purple-400 font-semibold mb-3">Team Info</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input className="input-field" name="teamName" placeholder="Team Name" value={form.teamName} onChange={handleChange} />
                  <input className="input-field" name="institution" placeholder="Institution / College" value={form.institution} onChange={handleChange} />
                </div>
              </div>

              {/* LEADER INFO */}
              <div>
                <h3 className="text-purple-400 font-semibold mb-3">Team Leader</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input className="input-field" name="leaderName" placeholder="Full Name" value={form.leaderName} onChange={handleChange} />
                  <input className="input-field" name="leaderEmail" placeholder="Leader Email" value={form.leaderEmail} onChange={handleChange} />
                </div>
              </div>

              {/* MEMBERS */}
              <div>
                <h3 className="text-purple-400 font-semibold mb-3">Team Members</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input className="input-field" name="member1Name" placeholder="Member 1 Name" value={form.member1Name} onChange={handleChange} />
                  <input className="input-field" name="member1Email" placeholder="Member 1 Email" value={form.member1Email} onChange={handleChange} />
                  <input className="input-field" name="member2Name" placeholder="Member 2 Name" value={form.member2Name} onChange={handleChange} />
                  <input className="input-field" name="member2Email" placeholder="Member 2 Email" value={form.member2Email} onChange={handleChange} />
                </div>
              </div>

              {/* PAYMENT */}
              <div>
                <h3 className="text-purple-400 font-semibold mb-3">Payment</h3>
                <input className="input-field" name="transactionId" placeholder="UPI Transaction ID" value={form.transactionId} onChange={handleChange} />
              </div>

              {/* SUBMIT */}
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold text-lg">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
