import "./App.css";
import Home from "./pages/Home";
import Assesment from "./pages/Assesment";
import { useState } from "react";
import Result from "./pages/Result";
import { evaluateAssessment } from "./api/assessmentAPi";
import RoadmapOverview from "./pages/RoadmapOverview";
import LevelContent from "./pages/LevelContent";
function App() {
  const [topic, setTopic] = useState(null);
  const [duration, setDuration] = useState(10);
  const [stage, setStage] = useState("home");
  const [result,setResult]=useState(null);
  
  
  function startAssesment(topic, duration) {
    setTopic(topic);
    setDuration(duration);
    setStage("assessing");
  }
  async function handleAssessmentFinish({answers,questions}){
    const res=await evaluateAssessment(answers,questions);
    setResult(res);
    setStage("result")
  }

  async function showLevelContent(){
    setStage("levelContent")
  }
  
  return (
    <>
    
      {stage === "home" && <Home onBegin={startAssesment} />}
      {stage === "assessing" && <Assesment topic={topic} duration={duration} handleAssessmentFinish={handleAssessmentFinish} onCancel={()=>setStage("home")}/>}

      {stage === "result" &&  result && <div><Result score={result.score} level={result.level} breakdown={result.breakdown}  topic={topic} duration={duration} onCancel={()=>setStage("home") }  showRoadmap={()=>setStage("roadmapOverview")}  /></div>}

      {stage === "roadmapOverview" && <div><RoadmapOverview topic={topic} duration={duration} level={result.level} score={result.score} breakdown={result.breakdown} showLevelContent={showLevelContent}  /></div> }

      {stage === 'levelContent' && <div><LevelContent /></div>}

      
    </>
  );
}

export default App;
