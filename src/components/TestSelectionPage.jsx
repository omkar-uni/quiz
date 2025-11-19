import { motion } from "framer-motion";

export default function TestSelectionPage({ onSelect }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-md w-full text-white space-y-6 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center">Choose a Test</h1>

        <button
          onClick={() => onSelect("test1")}
          className="w-full p-4 bg-blue-600 rounded-xl hover:bg-blue-700 text-lg font-semibold"
        >
          Test 1 – General Quiz
        </button>

        <button
          onClick={() => onSelect("test2")}
          className="w-full p-4 bg-purple-600 rounded-xl hover:bg-purple-700 text-lg font-semibold"
        >
          Test 2 – Science Quiz
        </button>
      </motion.div>
    </div>
  );
}
