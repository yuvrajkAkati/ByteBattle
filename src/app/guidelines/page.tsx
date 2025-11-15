"use client";
import { GridBackground } from "../components/ui/grid-background";


export default function GuidelinesPage() {
  return (
    <>

      <div className="min-h-screen text-white px-6 pt-28 pb-20">
        <GridBackground />
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold mb-6">Hackathon Guidelines</h1>
          <p className="text-gray-400 mb-10">
            Please read and follow the official guidelines for ByteBattle Hackathon 2026.
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Code of Conduct</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All participants must maintain professionalism and respect others.</li>
                <li>Harassment, bullying, or discrimination will lead to removal from the event.</li>
                <li>Any misconduct will result in immediate disqualification.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Team Rules</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Teams can consist of 1–4 members.</li>
                <li>Changing or merging teams after registration is not permitted.</li>
                <li>All team members must participate actively during the hackathon.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Project Guidelines</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All submissions must be original and created during the hackathon period.</li>
                <li>Use of previously written code must be properly declared.</li>
                <li>Any plagiarism will lead to immediate disqualification.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Judging Criteria</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Innovation and creativity of the solution.</li>
                <li>Technical complexity and implementation quality.</li>
                <li>Design, user experience, and UI aesthetics.</li>
                <li>Final presentation and explanation.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Event Rules</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Participants must follow all instructions from organizers and mentors.</li>
                <li>No external help or paid assistance is allowed.</li>
                <li>All decisions by organizers and judges are final.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Submission Process</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Final projects must be submitted before the deadline.</li>
                <li>Submission includes GitHub repo + project documentation + demo video.</li>
                <li>Late submissions will not be accepted.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Hardware & Tools</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Participants must bring their own laptops and chargers.</li>
                <li>Internet access will be provided on campus.</li>
                <li>Organizers are not responsible for personal belongings.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Communication</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Announcements will be made through email and the event dashboard.</li>
                <li>Participants must check updates regularly.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

    </>
  );
}