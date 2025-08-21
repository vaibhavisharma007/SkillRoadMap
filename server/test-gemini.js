import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const AI = new GoogleGenAI(process.env.API_KEY);

async function test() {
  try {
    const result = await AI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello!"
    });
    console.log(result.text());
  } catch (error) {
    console.error(error);
  }
}

test();
