import React, { useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaRegCircle } from "react-icons/fa";

const QuestionCard = ({
  questions,
  id,
  handleNext,
  handleAssessmentFinish,
  answers,
  setAnswers,
  
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [locked,setLocked]=useState(false);
  const handleNextClick=()=>{
    
    if(selectedOption===null){
        alert("please select an option before proceeding");
        return;
    }
    const newAnswers=[...answers,selectedOption];
    setAnswers(newAnswers);

    if(id=== questions.length-1){
        return handleAssessmentFinish({answers:newAnswers,questions});
    }
    
    setSelectedOption(null);
    setLocked(false);
    return handleNext(id+1);
  }

  const handleOptionClick=(index)=>{
    if(locked) return;//
    setLocked(true);
    setSelectedOption(index);
  }
  
  return (
    <div className="md:w-[40%] w-[60%] my-[5%] mx-auto flex flex-col border-2 rounded-lg ">
      <div className="mx-auto">
        {questions[id]?.id} of {questions.length}
      </div>
      <div className="flex justify-center items-center gap-5  p-4 text-center">
        <div className="leading-7 text-lg">{questions[id]?.question}</div>
        <div
          className={`border-2 rounded px-4 py-2 font-bold ${
            questions[id]?.difficulty === "Easy"
              ? "border-green-400 text-green-600"
              : questions[id]?.difficulty === "Medium"
              ? "border-orange-400 text-orange-500"
              : "border-red-400 text-red-600"
          }`}
        >
          {questions[id]?.difficulty}
        </div>
      </div>
      <div className="flex flex-col justify-start  px-5 ">
        {questions[id]?.options?.map((opt, index) => {
          const isSelected=selectedOption === index;
          const isCorrect=questions[id]?.correct === index;
          let optionStyle=" cursor-pointer border-2  m-4 text-md p-4 min-w-[75%] rounded-lg text-wrap";
          if(isSelected){
            optionStyle+=isCorrect?" border-green-400 bg-green-100":" border-red-400 bg-red-100";

          }
          else{
            optionStyle+=" border-gray-300"
          }
          return(
          <div className="flex items-center" key={index} >
            <div
              onClick={() => {
                handleOptionClick(index);
              }}
            >
              {selectedOption === index ? (
                <GrRadialSelected />
              ) : (
                <FaRegCircle />
              )}
            </div>
            <div
              className={optionStyle}
              onClick={() => {
                handleOptionClick(index);
              }}
            >
              {opt}
            </div>
          </div>
          
        
        )
          
})}
      </div>
      {
        locked && (
          <div className="px-5 py-3 text-md text-gray-700  italic border-4 mx-5 rounded-lg" >
            {questions[id]?.explanation}
          </div>
        )
      }
      <div className="flex" >
    
        <button
          className="border-2 w-[40%] mb-4 rounded-lg cursor-pointer px-4 py-3 text-lg mt-4 mx-auto"
          
          onClick={handleNextClick}
        >
          {id === questions.length - 1 ? "Submit" : "next"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
