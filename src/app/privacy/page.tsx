"use client";

import { GridBackground } from "../components/ui/grid-background";


export default function PrivacyPage() {
  return (
    <>

      <div className="min-h-screen text-white px-6 pt-28 pb-20">
        <GridBackground />
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-400 mb-10">
            Your privacy is important to us. This policy explains how we handle your information.
          </p>

          <div className="space-y-6 text-gray-300 leading-relaxed">

            <section>
              <h2 className="font-semibold text-xl mb-2">1. Data We Collect</h2>
              <p>
                We collect your name, email, college information, and project details during registration.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">2. How We Use Your Data</h2>
              <p>Your data is used solely for event communication, judging, and verification purposes.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">3. Data Sharing</h2>
              <p>
                We do not share your personal data with any third-party organizations except event partners.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">4. Security</h2>
              <p>We implement secure storage solutions to protect your information from unauthorized access.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">5. User Rights</h2>
              <p>
                You can request data deletion or modification at any time by contacting the organizers.
              </p>
            </section>

          </div>
        </div>
      </div>

    </>
  );
}