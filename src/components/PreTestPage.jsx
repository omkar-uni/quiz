import { motion } from "framer-motion";

export default function PreTestPage({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-sm mx-auto text-center
          bg-white/8 backdrop-blur-md border border-white/10
          p-6 rounded-2xl shadow-md

          lg:max-w-3xl lg:p-12 lg:rounded-3xl lg:shadow-xl
        "
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg lg:w-20 lg:h-20">
            <span className="text-2xl lg:text-3xl">🚀</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight mb-2 lg:text-4xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-cyan-300">
            Welcome to the Modern Quiz Challenge
          </span>
        </h1>

        <p className="text-sm text-white/80 mb-4 lg:text-lg">
          40 questions • 1 minute per question • Review your answers afterwards.
          Stay calm, focus, and do your best — you've got this!
        </p>

        <div className="text-left text-white/70 space-y-2 text-sm mb-6 lg:text-base lg:flex lg:justify-between lg:gap-6">
          <div>
            <p>✔️ 40 Questions</p>
            <p>✔️ Timer per question</p>
          </div>
          <div className="mt-2 lg:mt-0">
            <p>✔️ Scorecard at end</p>
            <p>✔️ Review & learn</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="
            mt-2 w-full py-3 rounded-xl font-bold
            bg-gradient-to-r from-indigo-600 to-blue-600
            shadow-lg hover:scale-[1.01] transform-gpu transition

            lg:py-4 lg:text-xl lg:rounded-2xl
          "
        >
          Start Test
        </button>

        <p className="mt-4 text-xs text-white/40">
          Tip: Read carefully — pace yourself.
        </p>
      </motion.div>
    </div>
  );
}
