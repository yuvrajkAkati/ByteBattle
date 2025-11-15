"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GridBackground } from "../components/ui/grid-background";

export default function PrizesPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <GridBackground />
      <Navbar />
      <main className="grow px-6 pt-32 pb-14">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Prizes & Recognition
          </h1>

          <p className="text-gray-300 text-lg mb-12 max-w-3xl">
            Hackathon 2026 rewards innovation, creativity, and technical excellence. 
            Top-performing teams will receive cash prizes, certificates, recognition, 
            and exclusive opportunities to showcase their talent.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden p-6 hover:border-red-500/60 transition">
              <h2 className="text-xl font-bold text-yellow-300">1st Place</h2>
              <p className="text-3xl font-bold mt-2 text-yellow-400">₹50,000</p>
              <p className="text-gray-300 text-sm mt-3">
                + Trophy & Certificate of Excellence
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden p-6 hover:border-red-500/60 transition">
              <h2 className="text-xl font-bold text-gray-200">2nd Place</h2>
              <p className="text-3xl font-bold mt-2 text-gray-100">₹40,000</p>
              <p className="text-gray-300 text-sm mt-3">
                + Trophy & Certificate of Excellence
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden p-6 hover:border-red-500/60 transition">
              <h2 className="text-xl font-bold text-orange-300">3rd Place</h2>
              <p className="text-3xl font-bold mt-2 text-orange-400">₹30,000</p>
              <p className="text-gray-300 text-sm mt-3">
                + Trophy & Certificate of Excellence
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Certificates & Awards
          </h2>

          <div className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden p-6 mb-10">
            <ul className="space-y-3 text-gray-300 text-sm list-disc pl-5">
              <li><span className="text-blue-400 font-medium">Certificate of Participation</span> — All registered participants</li>
              <li><span className="text-green-400 font-medium">Certificate of Appreciation</span> — Scoring ≥ 50% or in top 75%</li>
              <li><span className="text-purple-400 font-medium">Outstanding Performer Certificate</span> — Top 10% participants</li>
              <li><span className="text-pink-400 font-medium">Special Jury Awards</span> — Most Innovative & Social Impact Teams</li>
            </ul>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Additional Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {["Free accommodation during final round","Networking opportunities with industry mentors","Exclusive internship & mentorship opportunities","Campus experience & gala dinner at NIT Silchar"].map((benefit, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden p-6">
                <p className="text-gray-300 text-sm">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/40 rounded-lg text-red-200 hover:text-white hover:border-red-400/60 transition-all duration-300 hover:scale-105 text-sm font-semibold"
            >
              Register Now
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}