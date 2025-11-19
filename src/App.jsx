import { useEffect, useState } from "react";
import TestSelectionPage from "./components/TestSelectionPage";
import StudentInfoForm from "./components/StudentInfoForm";
import PreTestPage from "./components/PreTestPage";
import QuizCard from "./components/QuizCard";
import Timer from "./components/Timer";
import Certificate from "./components/Certificate";
import PostTestReview from "./components/PostTestReview";
import Leaderboard from "./components/Leaderboard";
import ReadyPage from "./components/ReadyPage";

import { tests } from "./data/tests";
import { saveResult } from "./utils/leaderboard";

export default function App() {
  const [screen, setScreen] = useState("intro");
  // intro → testSelect → student → ready → quiz → result

  const [selectedTest, setSelectedTest] = useState(null);
  const [student, setStudent] = useState(null);

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(15);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const [startTime, setStartTime] = useState(null);

  const questions = selectedTest ? tests[selectedTest].questions : [];

  // TIMER logic
  useEffect(() => {
    if (screen !== "quiz" || finished) return;

    if (time === 0) nextQuestion();

    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time, screen, finished]);

  const onAnswer = (opt) => {
    setAnswers((prev) => [...prev, opt]);
    if (opt === questions[index].answer) setScore((s) => s + 1);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setTime(15);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setFinished(true);

    const end = Date.now();
    const timeTakenSeconds = startTime
      ? Math.round((end - startTime) / 1000)
      : 0;

    saveResult({
      name: student?.name || "Unknown",
      grade: student?.grade || "",
      testName: tests[selectedTest]?.name || "Unknown Test",
      score,
      total: questions.length,
      timeTaken: timeTakenSeconds,
    });

    setScreen("result");
  };

  const restart = () => {
    setScreen("intro");
    setSelectedTest(null);
    setStudent(null);
    setFinished(false);
    setIndex(0);
    setAnswers([]);
    setScore(0);
    setTime(15);
    setStartTime(null);
  };

  return (
    <div className="min-h-screen w-full p-4 text-white">
      {/* 1️⃣ PrePage */}
      {screen === "intro" && (
        <PreTestPage
          onStart={() => setScreen("testSelect")}
          testName="Welcome To Skill Test"
        />
      )}

      {/* 2️⃣ Select Test */}
      {screen === "testSelect" && (
        <TestSelectionPage
          onSelect={(testId) => {
            setSelectedTest(testId);
            setScreen("student");
          }}
        />
      )}

      {/* 3️⃣ Student Details */}
      {screen === "student" && (
        <StudentInfoForm
          onSubmit={(data) => {
            setStudent(data);
            setScreen("ready");
          }}
        />
      )}

      {/* 4️⃣ Ready Page → Direct Quiz */}
      {screen === "ready" && (
        <ReadyPage
          testName={tests[selectedTest]?.name || "Selected Test"}
          onYes={() => {
            setStartTime(Date.now());
            setScreen("quiz");
          }}
          onNo={() => setScreen("testSelect")}
        />
      )}

      {/* 5️⃣ Quiz Page */}
      {screen === "quiz" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex justify-between">
            <h2>
              Question {index + 1}/{questions.length}
            </h2>
            <Timer time={time} />
          </div>

          <QuizCard q={questions[index]} onAnswer={onAnswer} />
        </div>
      )}

      {/* 6️⃣ Result */}
      {screen === "result" && (
        <div className="max-w-xl mx-auto space-y-6 text-center">
          <Certificate score={score} total={questions.length} />

          <button
            onClick={() => setScreen("review")}
            className="p-3 w-full bg-green-600 rounded-xl"
          >
            Review Test
          </button>

          <button
            onClick={() => setScreen("leaderboard")}
            className="p-3 w-full bg-yellow-600 rounded-xl"
          >
            Leaderboard
          </button>

          <button
            onClick={restart}
            className="p-3 w-full bg-blue-600 rounded-xl"
          >
            Retry
          </button>
        </div>
      )}

      {/* 7️⃣ Review */}
      {screen === "review" && (
        <PostTestReview
          questions={questions}
          answers={answers}
          onBack={() => setScreen("result")}
          onRestart={restart}
        />
      )}

      {/* 8️⃣ Leaderboard */}
      {screen === "leaderboard" && (
        <Leaderboard onBack={() => setScreen("result")} />
      )}
    </div>
  );
}
