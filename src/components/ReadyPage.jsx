import { motion } from "framer-motion";

export default function ReadyPage({ onYes, onNo, testName }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl text-center text-white max-w-md w-full shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-4">🚀 {testName}</h1>

        <p className="text-white/80 mb-6 text-lg">
          Are you ready to start the test?
        </p>

        <div className="space-y-3">
          <button
            onClick={onYes}
            className="w-full p-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold"
          >
            Yesss! Start 😎
          </button>

          <button
            onClick={onNo}
            className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold"
          >
            No, go back ❌
          </button>
        </div>
      </motion.div>
    </div>
  );
}
