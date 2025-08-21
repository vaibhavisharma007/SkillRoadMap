import axios from "axios";
export async function fetchAssessmentQuestions(topic) {
  try {
    const response = await axios.post(
      "http://localhost:6001/api/assessment/questions",
      { topic }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
export const evaluateAssessment = async (answers, questions) => {
  try {
    const result = await axios.post(
      "http://localhost:6001/api/assessment/evaluate",
      { answers, questions }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
