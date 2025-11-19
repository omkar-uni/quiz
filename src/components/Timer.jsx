import { useMemo } from "react";

export default function Timer({ time }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = useMemo(
    () => (time / 15) * circumference,
    [time, circumference]
  );

  return (
    <div className="flex items-center gap-3">
      <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-semibold text-sm shadow-sm lg:hidden">
        ⏳ {time}s
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <svg width="56" height="56">
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="#1f2937"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="url(#g1)"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        <div>
          <div className="text-gray-300">Time</div>
          <div className="text-lg font-bold">{time}s</div>
        </div>
      </div>
    </div>
  );
}
