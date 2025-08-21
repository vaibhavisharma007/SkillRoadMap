import React from "react";
const DurationSlider = ({ duration, setDuration }) => {
  return (
    <div className="card max-w-2xl mx-auto text-center mt-2">
      <div className="mb-4">
        <div className="text-sm text-violet-600 font-semibold">Learning Duration</div>
        <div className="text-3xl font-bold mt-2">{duration}</div>
      </div>

      <input className="w-full" type="range" min="1" max="60" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} />
      <div className="flex justify-between text-xs text-blue-700  mt-2">
        <span>1 day</span>
        <span >60 days</span>
      </div>

      
    </div>
  );
};

export default DurationSlider;
