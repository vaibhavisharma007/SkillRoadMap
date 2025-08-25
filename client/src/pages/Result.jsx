import React from "react";
import Marks from "../components/Marks";

const Result = ({ score, level, breakdown, topic, duration, onCancel,showRoadmap }) => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 px-2 py-6">
      <div
        className="shadow-2xl rounded-2xl bg-white text-center w-full max-w-md md:max-w-lg lg:max-w-md xl:max-w-md mx-auto px-4 py-6 md:px-5 md:py-8"
        style={{
          maxHeight: "650px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Cancel Button */}
        <div className="flex justify-end mb-2">
          <button onClick={onCancel} className="cursor-pointer border-2 px-3 py-1 rounded-xl text-red-600 hover:text-red-800 active:bg-red-400 active:text-amber-50 transition-all font-semibold text-sm md:text-base">
            Cancel
          </button>
        </div>

        {/* Marks Circle */}
        <div className="flex justify-center mb-6 md:mb-8">
          <Marks correct={breakdown.correct} />
        </div>

        {/* Score */}
        <div className="text-xl md:text-2xl font-bold mb-1">
          Your Score:{" "}
          <span className="text-green-600 text-2xl md:text-3xl">{score}%</span>
        </div>
        <div className="text-gray-700 mb-3 md:mb-4 text-base md:text-lg">
          Level: {level}
        </div>

        {/* Breakdown */}
        <div className="bg-gray-100  rounded-lg p-5 md:p-3 mb-3 md:mb-4">
          <div className="font-semibold mb-1 text-base ">
            Answer Breakdown
          </div>
          <div className="grid grid-cols-3 gap-2 text-lg font-medium ">
            <div>
              Easy:{" "}
              <span className="text-green-600">{breakdown.EasyCorrect}</span>
            </div>
            <div>
              Medium:{" "}
              <span className="text-yellow-600">{breakdown.MediumCorrect}</span>
            </div>
            <div>
              Hard:{" "}
              <span className="text-red-600">{breakdown.HardCorrect}</span>
            </div>
          </div>
          <div className="mt-1 text-gray-700 text-xs md:text-sm">
            Total correct: {breakdown.correct} / 10
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-base md:text-lg font-medium mb-1">
          Start your course for:
        </div>
        <div className="text-gray-800 font-semibold text-lg  mb-1">
          {topic}
        </div>
        <div className="text-gray-600 mb-3 text-md">
          Duration: {duration} days
        </div>
        
        <button  onClick={showRoadmap} className="bg-green-600 mx-[25%] cursor-pointer text-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow hover:bg-green-700 transition text-base md:text-lg font-semibold  md:w-auto mt-2">
          Explore your roadmap
        </button>

      </div>
    </div>
  );
};

export default Result;
