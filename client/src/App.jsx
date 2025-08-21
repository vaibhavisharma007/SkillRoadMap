import "./App.css";
import Home from "./pages/Home";
import Assesment from "./pages/Assesment";
import { useState } from "react";
import Result from "./pages/Result";
import { evaluateAssessment } from "./api/assessmentAPi";
import Loader from "./components/Loader";
function App() {
  const [topic, setTopic] = useState(null);
  const [duration, setDuration] = useState(10);
  const [stage, setStage] = useState("home");
  const [result,setResult]=useState(null)
  const [loading,setLoading]=useState(false);

  
  function startAssesment(topic, duration) {
    setTopic(topic);
    setDuration(duration);
    setStage("assessing");
  }
  async function handleAssessmentFinish({answers,questions}){
    setLoading(true);
    const res=await evaluateAssessment(answers,questions);
    setResult(res);
    setStage("result")
    setLoading(false)
  }
  return (
    <>
      {loading && <Loader/>}
      {/* is loader here correct */}
      {stage === "home" && <Home onBegin={startAssesment} />}
      {stage === "assessing" && <Assesment topic={topic} duration={duration} handleAssessmentFinish={handleAssessmentFinish} onCancel={()=>setStage("home")}/>}

      {stage === "result" &&  result && <div><Result score={result.score} level={result.level} breakdown={result.breakdown}  topic={topic} duration={duration} onCancel={()=>setStage("home")} /></div>}
    </>
  );
}

export default App;
