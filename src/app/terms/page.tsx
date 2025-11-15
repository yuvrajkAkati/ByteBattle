"use client";
import { GridBackground } from "../components/ui/grid-background"  ;

export default function TermsPage() {
  return (
    <>

      <div className="min-h-screen text-white px-6 pt-28 pb-20">
        <GridBackground />
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-400 mb-10">
            Please read the following terms carefully before participating in ByteBattle Hackathon.
          </p>

          <div className="space-y-6 text-gray-300 leading-relaxed">

            <section>
              <h2 className="font-semibold text-xl mb-2">1. Eligibility</h2>
              <p>Participation is open to all college students with valid identification.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">2. Team Formation</h2>
              <p>Teams may consist of 1–4 members. Changing teams after registration is not allowed.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">3. Submission Rules</h2>
              <p>All project submissions must be original and created during the hackathon timeline.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">4. Code of Conduct</h2>
              <p>
                Harassment, cheating, or inappropriate behavior will lead to immediate disqualification.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">5. Judging Criteria</h2>
              <p>Innovation, technical complexity, design, and presentation quality will be evaluated.</p>
            </section>

            <section>
              <h2 className="font-semibold text-xl mb-2">6. Organizer Rights</h2>
              <p>
                ByteBattle reserves the right to modify event rules or disqualify participants
                violating guidelines.
              </p>
            </section>

          </div>
        </div>
      </div>

    </>
  );
}