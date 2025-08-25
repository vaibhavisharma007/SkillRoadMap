import React, { useEffect } from "react";
import { useState } from "react";
import { fetchAssessmentQuestions } from "../api/assessmentAPi";
import Loader from "../components/Loader";
import QuestionCard from "../components/QuestionCard";
const Assesment = ({ topic, duration, handleAssessmentFinish,onCancel}) => {
  const [Questions, SetQuestions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(0);

  const [answers, setAnswers] = useState([]);

  const getQuestions = async (topic) => {
    setLoading(true);
    try {
      const Ques = await fetchAssessmentQuestions(topic);
      SetQuestions(Ques || []);
    } catch (err) {
      console.log("Failed to fetch questions: ", err);
      SetQuestions([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getQuestions(topic);
  }, [topic]);

  const handleNext = (id) => {
    if (id < Questions.length) {
      setId(id);
    }
  };

  return (
    <div className="h-screen ">
      <div className="flex justify-between items-center  border-4 mx-[10%] my-4 rounded-lg " >
        <div className="flex flex-col  ml-[40%] text-center">
          <div className="font-bold text-2xl " >Assesment Quiz</div>
          <div className="font-semibold" >Topic :{topic}</div>
          <div className="font-semibold" >Course Duration :{duration}</div>
        </div>
        <button className="border-2 p-3 mr-4 rounded-2xl cursor-pointer text-red-700 hover:bg-red-500 hover:text-white" onClick={onCancel}>Cancel</button>
      </div>

      {loading && <Loader message={"Preparing Your Assessment..."} />}
      {!loading && Questions.length > 0 && (
        <QuestionCard
          questions={Questions}
          id={id}
          handleNext={handleNext}
          handleAssessmentFinish={handleAssessmentFinish}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
    </div>
  );
};

export default Assesment;
