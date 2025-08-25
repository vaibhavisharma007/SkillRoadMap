import React, { useEffect, useState } from "react";
import { createRoadmap } from "../api/roadmapAPI";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
const RoadmapOverview = ({ topic, duration, level, score, breakdown}) => {

  const [loading, setLoading] = useState(false);
  const [roadmap, SetRoadmap] = useState(null);
  const [toggleDay, setToggleDay] = useState(null);
  const [toggleLevel, setToggleLevel] = useState(null);
  const levelColors = {
    1: "border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700",
    2: "border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700",
    3: "border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700",
  };
  async function handleCreateRoadmap(topic, duration, level, score, breakdown) {
    setLoading(true);
    const data = await createRoadmap(topic, duration, level, score, breakdown);
    console.log(data);

    SetRoadmap(data || null);
    setLoading(false);
  }
  useEffect(() => {
    handleCreateRoadmap(topic, duration, level, score, breakdown);
  }, [topic, duration, level, score, breakdown]);
  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-6xl mx-auto ">
        {/* header */}
        <header className="mb-8 bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl px-6 py-8 rounded-3xl  ">
          <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
            <div className="">
              <h1 className=" text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight ">
                {roadmap?.topic || topic}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="border-2 px-4 py-2 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                  📅 {roadmap?.duration || duration} days
                </span>
                <span
                  className={`border-2 px-4 py-2 text-xs rounded-full  ${
                    roadmap?.level == "Easy"
                      ? "bg-emerald-100 text-emerald-700"
                      : roadmap?.level == "Intermediate"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                  } `}
                >
                  🎯 {roadmap?.level || level}
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
      {loading && <Loader message={"creating your roadmap..."} />}

      {!loading && (
        <div className="flex  flex-col md:flex-row gap-8">
          {/* LEFT: timeline column */}
          <div className="relative">
            {/* vertical line for md+ */}
            <div className=" block absolute left-6 w-0.5 bg-gray-600 h-[calc(100%-3rem)] rounded-full opacity-30" />
            <div className="flex flex-col space-y-8">
              {roadmap?.days.map((d, idx) => {
                const isActive = toggleDay === d.dayNumber;
                return (
                  <motion.div
                    key={d.dayNumber}
                    initial={{ opacity: 0, scale:0 }}
                    animate={{ opacity: 1, scale:1 }}
                    transition={{ duration: 0.3, delay: idx * 0.3 }}
                    onClick={() => {
                      setToggleDay(isActive ? null : d.dayNumber);
                      setToggleLevel(null);
                    }}
                    className="relative z-10"
                  >
                    {/* dot */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative cursor-pointer z-10"
                    >
                      <div
                        className={`  w-12 h-12 border-4 flex items-center justify-center rounded-full ${
                          isActive
                            ? "bg-indigo-500 border-indigo-700 text-white"
                            : "bg-white border-indigo-500 text-indigo-600"
                        } transition`}
                      >
                        <span className="font-bold">{d.dayNumber}</span>
                      </div>
                    </motion.div>

                    {/* text */}

                    <div className="ml-20 -mt-14 pt-3 flex">
                      <div className="flex  flex-col">
                        <div className="font-bold text-xl text-slate-800">
                          Day {d.dayNumber}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                          <span className=" bg-gray-400 p-1.5 rounded-full text-white">
                            {d.estimatedTime}
                          </span>{" "}
                          minutes
                        </div>
                      </div>
                      <div className="cursor-pointer ml-4 border-4 bg-white/70 border-white/20 shadow-xl w-[65%] h-[45%] px-5 py-4 rounded-xl backdrop-blur-2xl ">
                        <div className=" text-center text-xl font-bold text-slate-400 mb-1">
                          you will learn
                        </div>
                        {/* to check the width of each card */}
                        <div className="text-sm  font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {d.levels.map((lev) =>
                            lev.topics.map((topic) => <div>{topic.title}</div>)
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Details column in right */}
          <div className="flex-1 ">
            <AnimatePresence mode="wait">
              {toggleDay === null ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 backdrop-blur-sm rounded-3xl border border-indigo-200 p-12 min-h-[400px] shadow-2xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-6xl mb-6"
                    >
                      🗺️
                    </motion.div>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                      Welcome to Your Learning Journey
                    </h2>
                    <p className="text-indigo-600 text-lg max-w-md mx-auto leading-relaxed">
                      Select a day from the timeline to explore your detailed
                      learning path, topics, and resources for that day.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`day-${toggleDay}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/40 p-8 min-h-[400px] shadow-2xl"
                >
                  {roadmap?.days
                    .filter((d) => d.dayNumber === toggleDay)
                    .map((d) => (
                      <div key={d.dayNumber} className="space-y-6">
                        {/* Day Header */}
                        <div
                          className="text-center pb-6 border-b border-gray-200"
                        >
                          <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Day {d.dayNumber}
                          </h2>
                          <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full text-xs">
                            <span className="text-indigo-600">⏱️</span>
                            <span className="font-semibold text-indigo-700">
                              {d.estimatedTime} minutes
                            </span>
                          </div>
                        </div>

                        {/* Levels */}
                        <div className="space-y-4">
                          {d.levels.map((level, levelIdx) => {
                            const isLevelActive =
                              toggleLevel === level.levelNumber;
                            return (
                              <motion.div
                                key={level.levelNumber}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: levelIdx * 0.1,
                                }}
                              >
                                {/* Level Button */}
                                <div className="flex  ">
                                  <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                      setToggleLevel(
                                        isLevelActive ? null : level.levelNumber
                                      )
                                    }
                                    className={`cursor-pointer w-full p-4 border-2 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                                      levelColors[level.levelNumber] ||
                                      levelColors[1]
                                    } ${
                                      isLevelActive
                                        ? "shadow-xl transform scale-[1.02]"
                                        : ""
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>Level {level.levelNumber}</span>
                                      <motion.span
                                        animate={{
                                          rotate: isLevelActive ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="text-xl "
                                      >
                                        ▼
                                      </motion.span>
                                    </div>
                                  </motion.button>
                                  <motion.button className="border-2 px-6 ml-6 rounded-xl text-xl text-green-600 border-green-200 cursor-pointer hover:bg-green-400 hover:text-green-100 hover:font-bold active:scale-[0.95] ">
                                    Start
                                  </motion.button>
                                  <motion.button  className="border-2 px-6 ml-6 rounded-xl text-xl text-blue-600 border-blue-200 cursor-pointer hover:bg-blue-400 hover:text-blue-100 hover:font-bold active:scale-[0.95] ">
                                    Quiz
                                  </motion.button>
                                  
                                </div>
                                {/* Topics*/}
                                <AnimatePresence>
                                  {isLevelActive && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                      }}
                                      className="mt-4 space-y-4 text-sm"
                                    >
                                      {level.topics.map((topic, topicIdx) => (
                                        <div
                                          key={topicIdx}
                                          className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                          {/* Topic Title */}
                                          <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-start gap-3">
                                            <span className="text-xs">📚</span>
                                            {topic.title}
                                          </h4>

                                          {/* Description */}
                                          <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                              <span className="text-xs">
                                                📝
                                              </span>
                                              <span className="font-semibold text-gray-700">
                                                Description
                                              </span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed pl-7">
                                              {topic.description}
                                            </p>
                                          </div>

                                          {/* Resources */}
                                          <div>
                                            <div className="flex items-center gap-2 mb-3">
                                              <span className="text-xs">
                                                🔗
                                              </span>
                                              <span className="font-semibold text-gray-700">
                                                Resources
                                              </span>
                                            </div>
                                            <div className="pl-7 space-y-2">
                                              {topic.resources.map(
                                                (resource, resourceIdx) => (
                                                  <motion.a
                                                    key={resourceIdx}
                                                    href={resource}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.02 }}
                                                    className="block p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-200 group"
                                                  >
                                                    <div className="flex items-center gap-3">
                                                      <span className="text-blue-500 group-hover:text-blue-600">
                                                        🌐
                                                      </span>
                                                      <span className="text-blue-600 group-hover:text-blue-700 text-sm font-medium break-all">
                                                        {resource.length > 60
                                                          ? `${resource.substring(
                                                              0,
                                                              60
                                                            )}...`
                                                          : resource}
                                                      </span>
                                                      <span className="text-blue-400 group-hover:text-blue-500 ml-auto">
                                                        ↗
                                                      </span>
                                                    </div>
                                                  </motion.a>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                      
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {/* why border isnt transparent here */}
                    
                    <motion.button  onClick={()=>{toggleDay===duration?null:setToggleDay(toggleDay+1) }} whileHover={{scale:0.95}} whileTap={{scale:1.1}} className={`mx-auto flex py-2 border-2 shadow-2xl mt-15 px-[9%]  text-2xl rounded-xl cursor-pointer  bg-gradient-to-r from-indigo-600 to bg-purple-600 bg-clip-text  text-transparent ${toggleDay===duration?"hidden":""} `} > Next Day</motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapOverview;
