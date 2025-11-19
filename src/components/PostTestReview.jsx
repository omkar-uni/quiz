import { motion } from "framer-motion";

export default function PostTestReview({
  questions,
  answers,
  onBack,
  onRestart,
}) {
  return (
    <div
      className="
        w-full max-w-sm mx-auto p-4 space-y-4 mt-6
        lg:max-w-3xl lg:p-10 lg:space-y-8 lg:mt-12
      "
    >
      <h1
        className="
          text-2xl lg:text-4xl font-extrabold text-center
          bg-gradient-to-r from-indigo-300 to-cyan-300 text-transparent bg-clip-text
        "
      >
        📘 Review Answers
      </h1>

      {questions.map((q, i) => {
        const userAnswer = answers[i];
        const correct = userAnswer === q.answer;

        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="
              bg-white/10 backdrop-blur-xl border border-white/10 
              p-4 rounded-2xl shadow text-sm space-y-2

              lg:p-8 lg:rounded-3xl lg:text-lg
            "
          >
            <h2 className="font-semibold">
              {i + 1}. {q.question}
            </h2>

            {/* Options */}
            {q.options.map((opt) => (
              <div
                key={opt}
                className={`
                  p-2 rounded-lg border text-sm lg:p-4 lg:text-base mt-1
                  ${
                    opt === q.answer
                      ? "bg-green-500/20 border-green-400"
                      : "border-white/20"
                  }
                  ${
                    opt === userAnswer && opt !== q.answer
                      ? "bg-red-500/20 border-red-400"
                      : ""
                  }
                `}
              >
                {opt}
              </div>
            ))}

            <div className="text-xs lg:text-sm mt-2">
              <p>
                <span className="text-green-400 font-bold">Correct:</span>{" "}
                {q.answer}
              </p>
              <p>
                <span className={correct ? "text-green-400" : "text-red-400"}>
                  You: {userAnswer}
                </span>
              </p>
            </div>
          </motion.div>
        );
      })}

      <div className="grid grid-cols-2 gap-3 mt-6 lg:gap-6">
        <button
          onClick={onBack}
          className="
            p-3 rounded-xl bg-gray-600 hover:bg-gray-700
            lg:p-4 lg:text-xl lg:rounded-2xl
          "
        >
          Back
        </button>
        <button
          onClick={onRestart}
          className="
            p-3 rounded-xl bg-blue-600 hover:bg-blue-700
            lg:p-4 lg:text-xl lg:rounded-2xl
          "
        >
          Retry
        </button>
      </div>
    </div>
  );
}
