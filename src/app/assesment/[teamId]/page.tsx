"use client";
import { useEffect, useState } from "react";

// ⭐ Convex imports
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";

interface Question {
  _id: string;
  question: string;
  options: string[];
  answer?: string;
}

export default function AssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const [timeLeft, setTimeLeft] = useState(1800);
  const [started, setStarted] = useState(false);
  const [reentered, setReentered] = useState(false);

  const [loadingState, setLoadingState] = useState(true);

  // ⭐ fetch logged-in team
  const myTeam = useQuery(api.teamRegistrations.getMyRegistration);

  // ⭐ fetch attempt status
  const round1Status = useQuery(
    api.round1.getRound1Status,
    myTeam?._id ? { teamId: myTeam._id } : "skip"
  );

  // ⭐ mutation to save score
  const submitRound1 = useMutation(api.round1.submitRound1);

  /* ---------------------- FETCH QUESTIONS ---------------------- */
  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  /* ---------------------- CHECK RESUME ---------------------- */
  useEffect(() => {
    const savedStart = localStorage.getItem("assessmentStartTime");
    const alreadyStarted = localStorage.getItem("assessmentStarted");

    if (alreadyStarted && savedStart) {
      setStarted(true);
      setReentered(true);
    }

    setLoadingState(false);
  }, []);

  /* ---------------------- START TEST ---------------------- */
  const startTest = () => {
    localStorage.setItem("assessmentStarted", "true");

    if (!localStorage.getItem("assessmentStartTime")) {
      localStorage.setItem("assessmentStartTime", Date.now().toString());
    }

    setStarted(true);
  };

  /* ---------------------- TIMER ---------------------- */
  useEffect(() => {
    if (!started || submitted) return;

    const savedStart = localStorage.getItem("assessmentStartTime");
    if (!savedStart) return;

    const updateTimer = () => {
      const startTime = Number(savedStart);
      const endTime = startTime + 1800 * 1000;
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

      setTimeLeft(remaining);

      if (remaining <= 0) handleSubmit();
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [started, submitted]);

  /* ---------------------- ANSWER HANDLER ---------------------- */
  const handleChange = (qid: string, ans: string) => {
    setAnswers({ ...answers, [qid]: ans });
  };

  /* ---------------------- SUBMIT TEST ---------------------- */
  const handleSubmit = async () => {
    localStorage.removeItem("assessmentStartTime");
    localStorage.removeItem("assessmentStarted");

    // Calculate score from API
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    setScore(data.score);
    setSubmitted(true);

    // ⭐ Save score in Convex
    if (myTeam?._id) {
      await submitRound1({
        teamId: myTeam._id,
        score: data.score,
      });
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  /* ---------------------- BLOCK RETAKE IMMEDIATELY ---------------------- */

// ⚠️ Don't show anything until team + attempt status is loaded
if (!myTeam || round1Status === undefined) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-700">
      Loading...
    </div>
  );
}

if (round1Status.attempted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl p-10 shadow text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          You Have Already Attempted Round 1
        </h1>

        <p className="text-gray-700 mb-4">
          Your score:
          <span className="font-bold text-blue-600">
            {" "}{round1Status.score}/60
          </span>
        </p>

        <a href="/" className="px-6 py-3 bg-gray-800 text-white rounded-xl">
          Go Home
        </a>
      </div>
    </div>
  );
}

/* ---------------------- UI LOADING FIX ---------------------- */
if (loadingState) return null;


  /* ---------------------- NORMAL UI BELOW (UNCHANGED) ---------------------- */
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-900 px-6 pt-24 pb-10 flex justify-center">

        {/* FIRST ENTRY MODAL */}
        {!started && !submitted && !reentered && (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border p-10 text-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Ready to Begin the Assessment?
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              You will have <span className="font-semibold">30 minutes</span>.
            </p>

            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={startTest}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold"
              >
                Yes, Start Test
              </button>

              <a
                href="/events"
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl text-lg font-semibold"
              >
                No, Go Back
              </a>
            </div>
          </div>
        )}

        {/* MAIN TEST UI */}
        {started && !submitted && (
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">

            {/* QUESTIONS */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Question {current + 1} of {questions.length}
                </h2>
                <p className="text-red-500 font-bold">{formatTime(timeLeft)}</p>
              </div>

              {questions.length > 0 && (
                <>
                  <p className="text-gray-800 text-lg mb-6">
                    {questions[current].question}
                  </p>
                  <div className="space-y-3">
                    {questions[current].options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
                          answers[questions[current]._id] === opt
                            ? "bg-blue-50 border-blue-400"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name={questions[current]._id}
                          value={opt}
                          checked={answers[questions[current]._id] === opt}
                          onChange={(e) =>
                            handleChange(questions[current]._id, e.target.value)
                          }
                          className="mr-3 accent-blue-500"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </>
              )}

              <div className="flex justify-between mt-10">
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className={`px-5 py-2 rounded-lg font-semibold ${
                    current === 0
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>

                {current === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            {/* NAVIGATOR */}
            <div className="bg-white rounded-2xl shadow-md border p-6 h-fit sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Question Navigator
              </h3>

              <div className="grid grid-cols-5 gap-3">
                {questions.map((q, idx) => (
                  <button
                    key={q._id}
                    onClick={() => setCurrent(idx)}
                    className={`w-10 h-10 rounded-full font-semibold ${
                      idx === current
                        ? "bg-blue-600 text-white"
                        : answers[q._id]
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBMITTED SCREEN */}
        {submitted && (
          <div className="col-span-2 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg border p-10">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Test Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-800">
              Your Score:{" "}
              <span className="font-bold text-blue-600">{score}/60</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
