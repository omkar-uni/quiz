export default function Certificate({ score, total }) {
  return (
    <div
      className="
        w-full max-w-sm mx-auto text-center 
        bg-white/10 backdrop-blur-xl border border-white/10 
        p-6 rounded-2xl shadow-lg

        lg:max-w-3xl lg:p-12 lg:rounded-3xl lg:shadow-2xl
      "
    >
      {/* Title */}
      <h1
        className="
          text-3xl lg:text-5xl font-extrabold mb-4
          bg-gradient-to-r from-yellow-300 to-orange-400 
          text-transparent bg-clip-text
        "
      >
        🏆 Certificate of Achievement
      </h1>

      <p className="text-sm lg:text-xl opacity-80">
        You completed the quiz with
      </p>

      {/* Score */}
      <h2 className="text-3xl lg:text-6xl font-bold mt-4 text-green-300">
        {score} / {total}
      </h2>

      <p className="mt-6 text-white/60 text-sm lg:text-lg">
        Amazing work! Keep learning and keep growing 🌱
      </p>
    </div>
  );
}
