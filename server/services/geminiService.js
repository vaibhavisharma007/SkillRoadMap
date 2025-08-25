import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Function to generate normal text
export async function generateText(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}

// Function to generate JSON
export async function generateJSON(prompt, schemaHint = "") {
  const guard = `
    RULES:
    - Respond ONLY with valid JSON. No extra text, no comments.
    - If unsure, return an empty JSON object {}.
    ${schemaHint ? `- SCHEMA: ${schemaHint}` : ""}
  `;

  try {
    const text = await generateText(`${prompt}\n\n${guard}`);
    return text; // return raw text, let caller parse
  } catch (error) {
    console.error("Error generating JSON from Gemini:", error);
    return ""; // fail-safe return
  }
}