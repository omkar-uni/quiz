import { useEffect, useState } from "react";

export default function Leaderboard({ onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [testFilter, setTestFilter] = useState("All");
  const [sortType, setSortType] = useState("score");

  const medals = ["🥇", "🥈", "🥉"];

  async function loadLeaderboard() {
    try {
      const res = await fetch("http://localhost:3000/api/getLeaderboard");
      const data = await res.json();

      // Sorting
      if (sortType === "score") {
        data.sort((a, b) => b.score - a.score);
      } else {
        data.sort((a, b) => a.timeTaken - b.timeTaken);
      }

      setResults(data);
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(() => loadLeaderboard(), 10000);
    return () => clearInterval(interval);
  }, [sortType]);

  const filteredResults = results.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchTest = testFilter === "All" || r.testName === testFilter;
    return matchSearch && matchTest;
  });

  const testTypes = [...new Set(results.map((r) => r.testName))];

  return (
    <div className="w-full min-h-screen p-4 text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">
          🏆 Leaderboard
        </h1>

        {/* Back button */}
        <div className="flex justify-start">
          <button
            onClick={onBack}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md font-semibold"
          >
            ⬅ Back
          </button>
        </div>

        {/* Filters Section */}
        <div
          className="
          bg-white/10 rounded-xl p-4 flex flex-col md:flex-row 
          gap-4 md:items-center border border-white/20 shadow-sm
        "
        >
          {/* Search */}
          <input
            placeholder="Search by name..."
            className="
              p-2 rounded-lg bg-white/5 border border-white/20
              text-white placeholder-white/60 w-full focus:outline-none
              focus:ring-2 focus:ring-blue-400
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Test Filter */}
          <select
            className="
              p-2 rounded-lg bg-white/5 border border-white/20 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
            value={testFilter}
            onChange={(e) => setTestFilter(e.target.value)}
          >
            <option value="All" className="text-black">
              All Tests
            </option>
            {testTypes.map((t, i) => (
              <option className="text-black" key={i} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            className="
              p-2 rounded-lg bg-white/5 border border-white/20 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="score" className="text-black">
              Sort by Score (High → Low)
            </option>
            <option value="time" className="text-black">
              Sort by Time (Fastest → Slowest)
            </option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-white/70">Loading leaderboard...</p>
        )}

        {/* No Results */}
        {!loading && filteredResults.length === 0 && (
          <p className="text-center text-white/70 text-lg">
            No matching entries found.
          </p>
        )}

        {/* Table */}
        {!loading && filteredResults.length > 0 && (
          <div
            className="
              overflow-x-auto bg-white/10 backdrop-blur-xl 
              border border-white/20 rounded-2xl p-4 md:p-6 shadow-md
            "
          >
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr
                  className="
                  border-b border-white/20 text-xs md:text-sm 
                  uppercase tracking-wide text-white/70
                "
                >
                  <th className="py-3">Rank</th>
                  <th className="py-3">Name</th>
                  <th className="py-3">Test</th>
                  <th className="py-3">Score</th>
                  <th className="py-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.map((r, i) => (
                  <tr
                    key={i}
                    className="
                      border-b border-white/10 text-xs md:text-base
                      hover:bg-white/5 transition-all duration-300
                    "
                    style={{
                      animation: `fadeIn 0.5s ease ${i * 0.05}s`,
                    }}
                  >
                    <td className="py-3 font-bold">
                      {i < 3 ? medals[i] : `#${i + 1}`}
                    </td>

                    <td className="py-3">{r.name}</td>
                    <td className="py-3">{r.testName}</td>
                    <td className="py-3">
                      {r.score} / {r.total}
                    </td>
                    <td className="py-3">{r.timeTaken}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
