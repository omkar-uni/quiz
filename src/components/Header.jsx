export default function Header() {
  return (
    <header
      className="
        w-full max-w-4xl mt-6
        py-5 px-6
        bg-white/5 backdrop-blur-xl
        shadow-xl shadow-black/20
        border border-white/10
        rounded-2xl
        flex justify-center
      "
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-cyan-300 text-transparent bg-clip-text">
        ⚡ Modern Quiz Experience
      </h1>
    </header>
  );
}
