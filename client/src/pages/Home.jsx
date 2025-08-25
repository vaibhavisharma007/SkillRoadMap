import React from "react";
import TopicCard from "../components/TopicCard";
import DurationSlider from "../components/DurationSlider";
import { useState } from "react";
import {motion} from "framer-motion"
const TOPICS = [
  {
    key: "JavaScript",
    name: "JavaScript",
    desc: "Master the language of the web",
    icon: "⚡",
  },
  {
    key: "React",
    name: "React",
    desc: "Build dynamic user interfaces",
    icon: "⚛️",
  },
  { key: "Node", name: "Node.js", desc: "Server-side JavaScript", icon: "🟢" },
  {
    key: "Python",
    name: "Python",
    desc: "Versatile programming language",
    icon: "🐍",
  },
  {
    key: "DSA",
    name: "Data Structures",
    desc: "Problem-solving & algorithms",
    icon: "🧠",
  },
  {
    key: "HTMLCSS",
    name: "HTML & CSS",
    desc: "Structure & style the web",
    icon: "🎨",
  },
  { key: "MongoDB", name: "MongoDB", desc: "NoSQL mastery", icon: "🍃" },
  { key: "SQL", name: "SQL", desc: "Relational queries", icon: "🗄️" },
  {
    key: "Git",
    name: "Git & GitHub",
    desc: "Version control essentials",
    icon: "🐙",
  },
  {
    key: "REST",
    name: "REST APIs",
    desc: "Build and consume APIs",
    icon: "🔗",
  },
  { key: "TS", name: "TypeScript", desc: "Type-safe JavaScript", icon: "🔒" },
  { key: "Vue", name: "Vue.js", desc: "Progressive framework", icon: "🟩" },
];
const Home = ({ onBegin }) => {
  const [selected, onSelect] = useState(null); //it contains topic
  const [duration, setDuration] = useState(7);
  const [topic,setTopic]=useState("");
  return (
    
    <div className="container mx-auto px-6 py-12 ">
      <div className="text-center mb-8 ">
        <h1 className="font-bold text-4xl text-violet-950">
          Choose Your Adventure
        </h1>
        <p className="mt-2 text-violet-500">
          Pick a topic and set a learning duration.Then start the assessment.
        </p>
      </div>

      {/* topics */}
      <div className="text-center p-4" >
        <input type="text"   className="p-4 border-4 rounded" placeholder="Enter topic here" onChange={(e)=>{setTopic(e.target.value)}} />
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className=" border-2 ml-4 px-4 rounded-2xl bg-gray-400 cursor-pointer " onClick={()=>{onSelect(topic)}} >select</motion.button>
        {selected && (
          <div className="p-4 border-2 mx-auto max-w-[20%] my-4 rounded-2xl bg-green-300 font-lg">
            {selected}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TOPICS.map((topic) => (
          <TopicCard
            key={topic.key}
            title={topic.name}
            desc={topic.desc}
            icon={topic.icon}
            selected={selected === topic.key}
            onClick={() => {
              onSelect(topic.key);
            }}
          />
        ))}
      </div>

      {/* Duration */}
      <DurationSlider duration={duration} setDuration={setDuration} />

      {/* Submit button */}
      <div className="mt-8 text-center " >
        <button className=" cursor-pointer px-8  py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg" onClick={()=>{
            if(!selected) return alert("Pick a topic first");
            onBegin(selected,duration);
        }} >Start Assessment</button>
      </div>
    </div>
  );
};

export default Home;
