"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { GridBackground } from "../components/ui/grid-background";

const events = [
  {
    title: "Registration Opens",
    date: "2025-11-1",
    mode: "Online",
    details: "Registration portal opens for Hackathon 2026.",
    extra: ["All team leaders must register", "Max 4 members per team", "Free registration"],
    requiresDate: false,
    targetLabel: "Register Team",
    targetUrl: "/register",
  },
  {
    title: "Hackathon 2026 Launch Meetup",
    date: "2026-01-05",
    mode: "Virtual",
    details: "Kickoff session and event briefing",
    extra: ["Event overview", "Q&A session", "Meet the organizers"],
    requiresDate: true,
    targetLabel: "Join Meetup",
    targetUrl: "/meetup",
  },
  {
    title: "Online Assessment Round",
    date: "2026-01-14",
    mode: "Online Test",
    details: "MCQ + coding screening test",
    extra: ["MCQs", "Coding section", "40 minute duration"],
    requiresDate: true,
    targetLabel: "Start Test",
    targetUrl: "/assessment",
  },
  {
    title: "AI/ML Bootcamp",
    date: "2026-01-16",
    mode: "In-person",
    details: "Hands-on sessions at NIT Silchar",
    extra: ["Deep Learning", "ML Projects", "Career guidance"],
    requiresDate: true,
    targetLabel: "Join Bootcamp",
    targetUrl: "/bootcamp",
  },
  {
    title: "Team Networking Session",
    date: "2026-01-30",
    mode: "In-person",
    details: "Meet other teams & share ideas",
    extra: ["Ice breaking", "Idea exchange", "Team collaboration"],
    requiresDate: true,
    targetLabel: "Join Networking",
    targetUrl: "/networking",
  },
  {
    title: "Round 2 Submission Deadline",
    date: "2026-02-06",
    mode: "Online",
    details: "Submit your project for Round 2 evaluation",
    extra: ["Submit code", "Add documentation", "Upload demo"],
    requiresDate: true,
    targetLabel: "Submit Project",
    targetUrl: "/round2",
  },
  {
    title: "Final Round — Hackathon 2026",
    date: "2026-02-25",
    mode: "On-Campus",
    details: "Live finale & project presentations",
    extra: ["48hr hackathon", "Judging round", "Final presentations"],
    requiresDate: true,
    targetLabel: "Join Final",
    targetUrl: "/final",
  },
];

export default function EventsRoadmap() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  const myRegistration = useQuery(api.teamRegistrations.getMyRegistration);
  const isRegistered = !!myRegistration;

  const round1Status = useQuery(
    api.round1.getRound1Status,
    myRegistration?._id ? { teamId: myRegistration._id } : "skip"
  );

  const assessment = useQuery(
    api.round1.getMyRound1,
    myRegistration?._id ? { teamId: myRegistration._id } : "skip"
  );

  const round2Status = useQuery(
    api.round2.getRound2Status,
    myRegistration?._id ? { teamId: myRegistration._id } : "skip"
  );

  const paymentStatus = myRegistration?.paymentStatus;
  const isPaymentApproved = paymentStatus === "approved";
  const isPaymentPending = paymentStatus === "pending";
  const isPaymentRejected = paymentStatus === "rejected";

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <GridBackground />
      <Navbar />

      <div className="h-24 mt-32" />

      <main className="grow px-6 pb-14">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hackathon 2026 — Event Roadmap
          </h1>
          <p className="text-gray-400 mb-12">Timeline of all hackathon events</p>

          <div className="space-y-10 relative border-l border-gray-700 pl-6">
            {events.map((ev, idx) => {
              const isMeetup = ev.title === "Hackathon 2026 Launch Meetup";
              const isAssessment = ev.title === "Online Assessment Round";

              return (
                <div key={idx} className="relative">
                  <div
                    className="absolute -left-3.5 w-6 h-6 rounded-full bg-linear-to-r
                    from-purple-500 to-blue-500 border border-gray-900 shadow-lg"
                  />

                  <div
                    className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 
                    border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 
                    overflow-hidden p-5 hover:border-red-500/60 transition"
                  >
                    <span
                      className="text-xs px-2 py-1 rounded-md bg-gradient-to-r 
                      from-red-400 to-red-600 bg-clip-text text-transparent"
                    >
                      {ev.mode}
                    </span>

                    <h2 className="mt-2 text-lg font-semibold">{ev.title}</h2>
                    <p className="text-gray-400 text-sm mt-1">🗓 {ev.date}</p>
                    <p className="text-gray-300 text-sm mt-2">{ev.details}</p>

                    <button
                      onClick={() => toggle(idx)}
                      className="mt-3 inline-flex items-center gap-2 px-6 py-3 
                      bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/40 
                      rounded-lg text-red-200 hover:text-white hover:border-red-400/60 
                      transition-all duration-300 hover:scale-105 text-xs font-medium"
                    >
                      {openIndex === idx ? "Hide Details" : "View Details"}
                    </button>

                    {openIndex === idx && (
                      <>
                        <hr className="border-red-500/20 my-4" />

                        <ul className="space-y-2 text-sm text-gray-300">
                          {ev.extra.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-400">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>

                        {/* ------------------------- */}
                        {/*   MERGED FUNCTIONALITY    */}
                        {/* ------------------------- */}

                        <div className="mt-4">

                          {/* USER REGISTERED? */}
                          {isRegistered ? (
                            <>
                              <button
                                disabled
                                className="bg-gray-600 px-4 py-2 rounded-md text-xs font-medium opacity-80 cursor-not-allowed mr-2"
                              >
                                ✔ Registered
                              </button>

                              {isPaymentPending && (
                                <span className="bg-yellow-600/40 text-yellow-300 px-4 py-2 rounded-md text-xs font-medium">
                                  ⏳ Payment Pending
                                </span>
                              )}

                              {isPaymentRejected && (
                                <span className="bg-red-600/40 text-red-300 px-4 py-2 rounded-md text-xs font-medium">
                                  ❌ Payment Rejected — Contact Support
                                </span>
                              )}

                              {/* PAYMENT APPROVED BLOCK */}
                              {isPaymentApproved && (
                                <>
                                  {/* MEETUP */}
                                  {isMeetup &&
                                    (() => {
                                      const [y, m, d] = ev.date.split("-").map(Number);
                                      const start = new Date(y, m - 1, d, 18, 0, 0);
                                      const end = new Date(y, m - 1, d, 23, 0, 0);
                                      const now = new Date();

                                      if (now < start)
                                        return (
                                          <span className="bg-yellow-600/40 text-yellow-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                            ⏳ Upcoming
                                          </span>
                                        );

                                      if (now >= start && now <= end)
                                        return (
                                          <a
                                            href="https://zoom.us/j/1234567890"
                                            target="_blank"
                                            className="text-green-400 underline animate-pulse ml-2"
                                          >
                                            Join Now
                                          </a>
                                        );

                                      return (
                                        <span className="bg-blue-600/40 text-blue-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                          ✔ Completed
                                        </span>
                                      );
                                    })()}

                                  {/* ASSESSMENT ROUND */}
                                  {isAssessment &&
                                    (() => {
                                      if (round1Status?.attempted)
                                        return (
                                          <span className="bg-gray-500/40 text-gray-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                            ✔ Test Attempted
                                          </span>
                                        );

                                      const [y, m, d] = ev.date.split("-").map(Number);
                                      const start = new Date(y, m - 1, d, 20, 0, 0);
                                      const end = new Date(y, m - 1, d, 21, 0, 0);
                                      const now = new Date();

                                      if (now < start)
                                        return (
                                          <span className="bg-yellow-600/40 text-yellow-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                            ⏳ Upcoming
                                          </span>
                                        );

                                      if (now >= start && now <= end)
                                        return (
                                          <a
                                            href={`/assesment/${myRegistration?._id}`}
                                            className="text-green-400 underline animate-pulse ml-2"
                                          >
                                            Start Assessment
                                          </a>
                                        );

                                      return (
                                        <span className="bg-blue-600/40 text-blue-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                          ✔ Completed
                                        </span>
                                      );
                                    })()}

                                  {/* BOOTCAMP */}
                                  {ev.title === "AI/ML Bootcamp" && (
                                    assessment?.cleared ? (
                                      <span className="bg-green-600/30 text-green-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ✔ Registered for Bootcamp
                                      </span>
                                    ) : (
                                      <span className="bg-gray-500/40 text-gray-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ⛔ Requires clearing Round 1
                                      </span>
                                    )
                                  )}

                                  {/* NETWORKING */}
                                  {ev.title === "Team Networking Session" && (
                                    assessment?.cleared ? (
                                      <span className="bg-green-600/30 text-green-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ✔ Registered for Networking
                                      </span>
                                    ) : (
                                      <span className="bg-gray-500/40 text-gray-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ⛔ Requires clearing Round 1
                                      </span>
                                    )
                                  )}

                                  {/* ROUND 2 SUBMISSION */}
                                  {ev.title === "Round 2 Submission Deadline" &&
                                    (assessment?.cleared ? (
                                      (() => {
                                        const already = round2Status?.submitted;
                                        const [y, m, d] = ev.date.split("-").map(Number);
                                        const deadline = new Date(y, m - 1, d, 23, 59, 59);
                                        const now = new Date();

                                        if (now <= deadline)
                                          return (
                                            <a href="/round2">
                                              <button className="bg-blue-600 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                                {already ? "Update Your Project" : "Submit Your Project"}
                                              </button>
                                            </a>
                                          );

                                        return (
                                          <span className="bg-red-600/40 text-red-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                            ⛔ Submission Closed
                                          </span>
                                        );
                                      })()
                                    ) : (
                                      <span className="bg-gray-500/40 text-gray-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ⛔ Requires clearing Round 1
                                      </span>
                                    ))}

                                  {/* FINAL ROUND */}
                                  {ev.title === "Final Round — Hackathon 2026" && (
                                    round2Status?.cleared && assessment?.cleared ? (
                                      <span className="bg-green-600/30 text-green-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ✔ Registered for Final Round
                                      </span>
                                    ) : (
                                      <span className="bg-gray-500/40 text-gray-300 px-4 py-2 rounded-md text-xs font-medium ml-2">
                                        ⛔ Requires clearing Round 2
                                      </span>
                                    )
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {/* NOT REGISTERED */}
                              {ev.title === "Registration Opens" ? (
                                <>
                                  <SignedOut>
                                    <SignInButton mode="modal" forceRedirectUrl={ev.targetUrl}>
                                      <button className="border border-white px-4 py-2 rounded-md text-xs font-medium hover:bg-white hover:text-black transition">
                                        {ev.targetLabel}
                                      </button>
                                    </SignInButton>
                                  </SignedOut>

                                  <SignedIn>
                                    <a href={ev.targetUrl}>
                                      <button className="bg-green-600 px-4 py-2 rounded-md text-xs font-medium hover:bg-green-500 transition">
                                        {ev.targetLabel}
                                      </button>
                                    </a>
                                  </SignedIn>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
