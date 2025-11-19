import { motion } from "framer-motion";

export default function StudentInfoForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      grade: e.target.grade.value,
      roll: e.target.roll.value,
    };
    onSubmit(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl max-w-md w-full text-white space-y-6 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center">Student Details</h1>

        <input
          name="name"
          required
          placeholder="Full Name"
          className="w-full p-3 rounded-lg bg-white/20 outline-none"
        />

        <input
          name="grade"
          placeholder="Class / Grade"
          className="w-full p-3 rounded-lg bg-white/20 outline-none"
        />

        <input
          name="roll"
          placeholder="Roll No (Optional)"
          className="w-full p-3 rounded-lg bg-white/20 outline-none"
        />

        <button
          type="submit"
          className="w-full p-4 bg-green-600 rounded-xl hover:bg-green-700 text-lg font-semibold"
        >
          Continue
        </button>
      </motion.form>
    </div>
  );
}
