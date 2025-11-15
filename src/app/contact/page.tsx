"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail } from "lucide-react";
import { GridBackground } from "../components/ui/grid-background";

export default function ContactPage() {
  return (
    <div className="min-h-screenscreen text-white flex flex-col">
      {/* Navbar */}
      <GridBackground />
      <Navbar />

      {/* FIX: no overlap */}
      <div className="flex-1 px-6 md:px-20 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <p className="text-gray-300 max-w-2xl mb-10">
          Have questions about ByteBattle 2025? Want to collaborate or need support?
          Reach out to us through the form below, or use any of the contact details.
        </p>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* CONTACT FORM BOX */}
          <div className="
            bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 
            border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 
            overflow-hidden p-8
          ">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Send a Message
            </h2>

            <form className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md 
                             bg-black/30 border border-red-500/30 text-white
                             focus:outline-none focus:border-red-400"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-md 
                             bg-black/30 border border-red-500/30 text-white
                             focus:outline-none focus:border-red-400"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 rounded-md 
                             bg-black/30 border border-red-500/30 text-white
                             focus:outline-none focus:border-red-400"
                  required
                ></textarea>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 
                           bg-gradient-to-r from-red-500/20 to-red-700/20 
                           border border-red-500/40 rounded-lg text-red-200
                           hover:text-white hover:border-red-400/60 
                           transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Mail />
                Submit Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO BOX */}
          <div className="
            bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 
            border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 
            overflow-hidden p-8
          ">
            <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Contact Information
            </h2>

            <div className="space-y-6 text-gray-300">

              {/* EMAIL */}
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p>bvigoraj@gmail.com</p>
                {/* <p>events@bytebattle.com</p> */}
              </div>

              {/* ADDRESS */}
              <div>
                <h3 className="font-semibold text-white">Office Address</h3>
                <p>NIT Silchar</p>
                <p>Silchar, Assam, India</p>
                <p>Pin - 788010</p>
              </div>

              {/* SOCIAL LINKS */}
              <div>
                <h3 className="font-semibold text-white mb-2">Follow Us</h3>
                <div className="flex gap-4 text-lg">
                  <a href="https://x.com/BYTEBATTLEX" className="hover:text-red-400" target="_blank">Twitter</a>
                  <a href="https://www.instagram.com/byte.battle.x.nits/" className="hover:text-red-400" target="_blank">Instagram</a>
                  <a href="#" className="hover:text-red-400">Facebook</a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}