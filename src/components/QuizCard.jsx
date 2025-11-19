import { motion } from "framer-motion";

export default function QuizCard({ q, onAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-sm mx-auto bg-white/10
      backdrop-blur-xl border border-white/10 rounded-2xl p-5
      shadow-lg text-white space-y-4"
    >
      <h2 className="text-lg font-semibold">{q.question}</h2>

      <div className="grid gap-3">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAnswer(opt)}
            className="p-3 rounded-xl bg-white/10 border border-white/20"
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
