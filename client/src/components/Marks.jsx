import React from "react";

const Marks = ({ correct, total = 20 }) => {
  const percentage = (correct / total) * 100;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
      {/* Background + Progress Circle */}
      <svg
        className="-rotate-90 absolute top-0 left-0"
        width="100%"
        height="100%"
        viewBox="0 0 140 140"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#66ffb3"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Centered Text */}
      <div className="text-xl md:text-2xl font-bold text-green-600">
        {correct}/{total}
      </div>
    </div>
  );
};

export default Marks;
