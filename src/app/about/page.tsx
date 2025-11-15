"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GridBackground } from "../components/ui/grid-background";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <GridBackground />
      <Navbar />
      <main className="grow px-6 pt-32 pb-14">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About ByteBattle 2026
          </h1>

          <p className="text-gray-300 max-w-3xl text-lg mb-10">
            ByteBattle 2026 is a national-level coding challenge hosted by
            <span className="text-blue-400 font-semibold"> NIT Silchar</span>, bringing together
            the brightest minds in software development, AI, and innovation.
            Over multiple rounds—online and offline—participants will build creative,
            scalable, and real-world solutions to emerging technology challenges.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Why ByteBattle 2026?
          </h2>

          <p className="text-gray-400 mb-8">
            This hackathon is more than just a competition — it's a launchpad for innovation, creativity, and real-world impact.
            Participants will dive into the most transformative technologies of our era, including Artificial Intelligence, Machine Learning and Software Development.
            Over the course of the event, you will work on real industry-aligned challenges, collaborate with talented peers from across the country, and gain hands-on exposure to cutting-edge problem-solving environments.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {[
              { title: "National Level Competition", desc: "Open to students across India — UG, PG, PhD" },
              { title: "AI/ML Focus", desc: "Solve real-world challenges using emerging tech" },
              { title: "Multi-stage Rounds", desc: "Online screening → AI problem round → Live campus finale" },
              { title: "Certificates & Prizes", desc: "Top performers receive cash prizes and recognition" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#161622] border border-gray-700 p-6 rounded-xl shadow hover:border-blue-500 transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            About NIT Silchar
          </h2>

          <p className="text-gray-400 mb-8">
            The National Institute of Technology Silchar is one of India's leading institutions
            for technical education and research. Ranked among top engineering colleges,
            NIT Silchar is committed to fostering innovation, creativity, and excellence.
          </p>

          <div className="bg-[#161622] border border-gray-700 p-6 rounded-xl shadow mb-14">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Recognitions</h3>
            <ul className="text-gray-300 text-sm space-y-2 list-disc pl-4">
              <li>NIRF Engineering Rank: 40 (2024)</li>
              <li>QS Asia University Rank: 541 (2026)</li>
              <li>Global Green Metric Rank: 205 (2022)</li>
              <li>Hub for AI, ML & emerging tech research</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/40 rounded-lg text-red-200 hover:text-white hover:border-red-400/60 transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              Back to Home
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}